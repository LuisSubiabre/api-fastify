import LibretaModel from "../models/libreta.model.js";
import AsignaturaModel from "../models/asignatura.model.js";
import EstudianteModel from "../models/estudiante.model.js";
import CursoModel from "../models/curso.model.js";
import UsuarioModel from "../models/usuario.model.js";
import db from "../config/db.js";
import { QueryTypes } from "sequelize";

class LibretaService {
  async getLibretaById(estudiante_id) {
    return await LibretaModel.findAll({
      where: { estudiante_id },
      include: [
        {
          model: AsignaturaModel, // Incluye el modelo de Asignatura
          attributes: ["nombre", "indice", "concepto"], // Selecciona el campo "nombre" y "indice"
        },
        {
          model: EstudianteModel, // Incluye el modelo de Estudiante
          attributes: ["nombre"], // Selecciona solo el campo "nombre"
          include: [
            {
              model: CursoModel, // Incluye el modelo de Curso
              attributes: ["nombre"], // Selecciona solo el campo "nombre"
              include: [
                {
                  model: UsuarioModel,
                  as: "profesor_jefe",
                  attributes: ["nombre"],
                  foreignKey: "profesor_jefe_id",
                },
              ],
            },
          ],
        },
      ],
      order: [
        [
          // Ordena la relación principal (LibretaModel)
          { model: AsignaturaModel },
          "indice",
          "ASC",
        ], // Ordena por el campo "indice" de Asignatura
      ],
    });
  }

  async getPromedioPorCurso(curso_id) {
    const query = `
      WITH promedios_estudiantes AS (
        SELECT 
          ea.asignatura_id,
          ea.estudiante_id,
          AVG(CAST(nota AS FLOAT)) as promedio_estudiante
        FROM estudiantes_asignaturas ea
        CROSS JOIN LATERAL (
          SELECT unnest(ARRAY[
            calificacion1, calificacion2, calificacion3, calificacion4,
            calificacion5, calificacion6, calificacion7, calificacion8,
            calificacion9, calificacion10, calificacion11, calificacion12,
            calificacion13, calificacion14, calificacion15, calificacion16,
            calificacion17, calificacion18, calificacion19, calificacion20,
            calificacion21, calificacion22, calificacion23
          ]) as nota
        ) notas
        WHERE nota IS NOT NULL
        GROUP BY ea.asignatura_id, ea.estudiante_id
      )
      SELECT 
        c.nombre AS curso,
        a.nombre AS asignatura,
        a.concepto AS concepto,
        COUNT(DISTINCT pe.estudiante_id) AS cantidad_estudiantes,
        ROUND(AVG(pe.promedio_estudiante)::NUMERIC, 2) AS promedio_general
      FROM asignaturas a
      JOIN asignaturas_cursos ac ON ac.asignatura_id = a.asignatura_id
      JOIN cursos c ON c.curso_id = ac.curso_id
      JOIN estudiantes e ON e.curso_id = c.curso_id AND e.activo = true
      JOIN promedios_estudiantes pe ON pe.asignatura_id = a.asignatura_id AND pe.estudiante_id = e.estudiante_id
      WHERE c.curso_id = :curso_id
      GROUP BY c.nombre, a.asignatura_id, a.nombre, a.concepto, a.indice
      ORDER BY a.indice;
    `;

    const results = await db.query(query, {
      replacements: { curso_id },
      type: QueryTypes.SELECT
    });

    return results;
  }
}

export default LibretaService;
