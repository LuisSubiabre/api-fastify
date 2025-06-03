import AsistenciaModel from "../models/asistencia.model.js";
import EstudianteModel from "../models/estudiante.model.js";

class AsistenciaService {
  async getAsistenciaByEstudianteId(estudianteId) {
    try {
      // Verificar si el estudiante existe
      const estudiante = await EstudianteModel.findByPk(estudianteId);
      if (!estudiante) {
        throw new Error("Estudiante no encontrado");
      }

      // Obtener la asistencia ordenada por año y mes (más recientes primero)
      const asistencia = await AsistenciaModel.findAll({
        where: { estudiante_id: estudianteId },
        order: [
          ["anio", "DESC"],
          ["mes", "DESC"],
        ],
        attributes: [
          "mes",
          "anio",
          "total_dias",
          "dias_asistidos",
          "porcentaje_asistencia",
          "fecha_registro",
        ],
      });

      return asistencia;
    } catch (error) {
      console.error("Error en getAsistenciaByEstudianteId:", error);
      throw error;
    }
  }
}

export default AsistenciaService;
