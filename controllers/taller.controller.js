class TallerController {
  constructor({ TallerService }) {
    this._tallerService = TallerService;
  }

  // Listar talleres correspondientes al curso del estudiante
  async getTalleresByCursoId(req, reply) {
    const { curso_id } = req.params;
    const estudianteAutenticado = req.estudiante;

    try {
      // Verificar que el estudiante solo pueda ver talleres de su curso
      if (estudianteAutenticado.curso_id !== parseInt(curso_id)) {
        return reply.status(403).send({ 
          error: "Acceso denegado",
          message: "No tienes permiso para ver talleres de otro curso" 
        });
      }

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
    const estudianteAutenticado = req.estudiante;

    try {
      // Verificar que el estudiante solo pueda inscribirse a sí mismo
      if (estudianteAutenticado.estudiante_id !== parseInt(estudiante_id)) {
        return reply.status(403).send({ 
          error: "Acceso denegado",
          message: "No puedes inscribir a otro estudiante en un taller" 
        });
      }

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
    const estudianteAutenticado = req.estudiante;

    try {
      // Verificar que el estudiante solo pueda retirarse a sí mismo
      if (estudianteAutenticado.estudiante_id !== parseInt(estudiante_id)) {
        return reply.status(403).send({ 
          error: "Acceso denegado",
          message: "No puedes retirar a otro estudiante de un taller" 
        });
      }

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
    const estudianteAutenticado = req.estudiante;

    try {
      // Verificar que el estudiante solo pueda ver sus propios talleres inscritos
      if (estudianteAutenticado.estudiante_id !== parseInt(estudiante_id)) {
        return reply.status(403).send({ 
          error: "Acceso denegado",
          message: "No tienes permiso para ver los talleres de otro estudiante" 
        });
      }

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
