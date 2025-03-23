import AtrasoModel from "../models/atraso.model.js";
import EstudianteModel from "../models/estudiante.model.js";

class AtrasosService {
    async getAtrasosByEstudianteId(estudiante_id) {
      try {
        // Verificar si el estudiante existe
        const estudiante = await EstudianteModel.findByPk(estudiante_id);
        if (!estudiante) {
          throw new Error("Estudiante no encontrado");
        }

        // Obtener los atrasos ordenados por fecha (más recientes primero)
        const atrasos = await AtrasoModel.findAll({
          where: { estudiante_id },
          order: [["fecha", "DESC"]],
          include: [
            {
              model: EstudianteModel,
              as: "estudiante",
              attributes: ["nombre", "rut"],
            },
          ],
        });

        return atrasos;
      } catch (error) {
        console.error("Error en getAtrasosByEstudianteId:", error);
        throw error;
      }
    }
  }
  
  export default AtrasosService;
  