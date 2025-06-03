class AsistenciaController {
  constructor(asistenciaService) {
    this.asistenciaService = asistenciaService;
  }

  async getAsistenciaById(request, reply) {
    try {
      const { estudiante_id } = request.params;
      const asistencia =
        await this.asistenciaService.getAsistenciaByEstudianteId(estudiante_id);

      if (!asistencia || asistencia.length === 0) {
        return reply.code(404).send({
          success: false,
          message: "No se encontró asistencia para este estudiante",
        });
      }

      return reply.code(200).send({
        success: true,
        data: asistencia,
      });
    } catch (error) {
      return reply.code(500).send({
        success: false,
        message: error.message,
      });
    }
  }
}

export default AsistenciaController;
