import LibretaModel from "../models/libreta.model.js";
import AsignaturaModel from "../models/asignatura.model.js";
import EstudianteModel from "../models/estudiante.model.js";
import CursoModel from "../models/curso.model.js";
import UsuarioModel from "../models/usuario.model.js";

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
}

export default LibretaService;
