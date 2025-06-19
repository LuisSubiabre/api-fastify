class PersonalidadController {
  constructor(personalidadService) {
    this.personalidadService = personalidadService;
  }

  async getPersonalidadById(request, reply) {
    try {
      const { estudiante_id } = request.params;
      const personalidad =
        await this.personalidadService.getPersonalidadByEstudianteId(
          estudiante_id
        );

      if (!personalidad || personalidad.length === 0) {
        return reply.code(404).send({
          success: false,
          message:
            "No se encontró informe de personalidad para este estudiante",
        });
      }

      return reply.code(200).send({
        success: true,
        data: personalidad,
      });
    } catch (error) {
      return reply.code(500).send({
        success: false,
        message: error.message,
      });
    }
  }
}

export default PersonalidadController;
