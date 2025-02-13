import LibretaModel from "../models/libreta.model.js";
import AsignaturaModel from "../models/asignatura.model.js";
import EstudianteModel from "../models/estudiante.model.js";
import CursoModel from "../models/curso.model.js";

class LibretaService {
  async getLibretaById(estudiante_id) {
    return await LibretaModel.findAll({
      where: { estudiante_id },
      include: [
        {
          model: AsignaturaModel, // Incluye el modelo de Asignatura
          attributes: ["nombre"], // Selecciona solo el campo "nombre"
        },
        {
          model: EstudianteModel, // Incluye el modelo de Estudiante
          attributes: ["nombre"], // Selecciona solo el campo "nombre"
          include: [
            {
              model: CursoModel, // Incluye el modelo de Curso
              attributes: ["nombre"], // Selecciona solo el campo "nombre"
            },
          ],
        },
      ],
    });
  }
}

export default LibretaService;
