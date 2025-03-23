class AtrasosController {
  constructor(service) {
    this.service = service;
  }

  async getAtrasosById(req, reply) {
    try {
      const { estudiante_id } = req.params;
      console.log("estudiante_id", estudiante_id);

      if (!estudiante_id) {
        return reply.status(400).send({ error: "Falta el ID del estudiante" });
      }

      const atrasos = await this.service.getAtrasosByEstudianteId(estudiante_id);

      reply.send({ estudiante_id, atrasos });
    } catch (error) {
      console.error("Error al obtener atrasos:", error);
      reply.status(500).send({ error: "Error interno del servidor" });
    }
  }
}

export default AtrasosController;
