import PersonalidadModel from "../models/personalidad.model.js";
import EstudianteModel from "../models/estudiante.model.js";
import CursoModel from "../models/curso.model.js";
import UsuarioModel from "../models/usuario.model.js";

class PersonalidadService {
  async getPersonalidadByEstudianteId(estudianteId) {
    try {
      const personalidad = await PersonalidadModel.findAll({
        where: {
          estudiante_id: estudianteId,
        },
        include: [
          {
            model: EstudianteModel,
            as: "estudiante",
            include: [
              {
                model: CursoModel,
                include: [
                  {
                    model: UsuarioModel,
                    as: "profesor_jefe",
                    attributes: ["usuario_id", "nombre"],
                  },
                ],
                attributes: ["curso_id", "nombre", "descripcion"],
              },
            ],
            attributes: ["estudiante_id", "nombre", "rut", "curso_id"],
          },
        ],
        order: [["anio", "DESC"]],
      });
      
      return personalidad;
    } catch (error) {
      throw new Error(`Error al obtener personalidad: ${error.message}`);
    }
  }

  async findOne(options) {
    return await PersonalidadModel.findOne(options);
  }

  async findAll(options) {
    return await PersonalidadModel.findAll(options);
  }

  async create(data) {
    return await PersonalidadModel.create(data);
  }

  async update(estudianteId, anio, data) {
    return await PersonalidadModel.update(data, {
      where: {
        estudiante_id: estudianteId,
        anio: anio,
      },
    });
  }
}

export default PersonalidadService; 