class TallerController {
  constructor({ TallerService }) {
    this._tallerService = TallerService;
  }

  // Listar talleres correspondientes al curso del estudiante
  async getTalleresByCursoId(req, reply) {
    const { curso_id } = req.params;

    try {
      const talleres = await this._tallerService.getTalleresByCursoId(curso_id);
      return reply.status(200).send(talleres);
    } catch (error) {
      console.error("Error al obtener los talleres:", error);
      return reply.status(500).send({ message: "Error interno del servidor" });
    }
  }

  // Inscribir a un estudiante en un taller
  async inscribirEstudiante(req, reply) {
    const { taller_id, estudiante_id } = req.body;

    try {
      const resultado = await this._tallerService.inscribirEstudiante(
        taller_id,
        estudiante_id
      );
      return reply.status(200).send(resultado);
    } catch (error) {
      console.error("Error al inscribir al estudiante:", error);
      return reply.status(400).send({ message: error.message });
    }
  }

  // Retirar a un estudiante de un taller
  async retirarEstudiante(req, reply) {
    const { taller_id, estudiante_id } = req.body;

    try {
      const resultado = await this._tallerService.retirarEstudiante(
        taller_id,
        estudiante_id
      );
      return reply.status(200).send(resultado);
    } catch (error) {
      console.error("Error al retirar al estudiante:", error);
      return reply.status(400).send({ message: error.message });
    }
  }

  // Listar talleres inscritos de un estudiante
  async getTalleresInscritos(req, reply) {
    const { estudiante_id } = req.params;

    try {
      const talleres = await this._tallerService.getTalleresByEstudianteId(
        estudiante_id
      );
      return reply.status(200).send(talleres);
    } catch (error) {
      console.error("Error al obtener los talleres inscritos:", error);
      return reply.status(500).send({ message: "Error interno del servidor" });
    }
  }
}

export default TallerController;
