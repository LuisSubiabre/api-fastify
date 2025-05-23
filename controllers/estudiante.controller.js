import CursoModel from "../models/curso.model.js";

class EstudianteController {
  constructor({ EstudianteService }) {
    this._estudianteService = EstudianteService; // Asegúrate de asignar el servicio
  }

  async getEstudianteById(req, reply) {
    const { id } = req.params;
    const estudianteAutenticado = req.estudiante;

    try {
      // Verificar que el estudiante solo pueda ver sus propios datos
      if (estudianteAutenticado.estudiante_id !== parseInt(id)) {
        return reply.status(403).send({ 
          error: "Acceso denegado",
          message: "No tienes permiso para ver los datos de otro estudiante" 
        });
      }

      const estudiante = await this._estudianteService.findOne({
        where: { estudiante_id: id },
        include: {
          model: CursoModel,
          attributes: ["nombre"],
        },
      });

      if (!estudiante) {
        return reply.status(404).send({ message: "Estudiante no encontrado" });
      }

      return reply.status(200).send({
        estudiante_id: estudiante.estudiante_id,
        nombre: estudiante.nombre,
        rut: estudiante.rut,
        numlista: estudiante.numlista,
        email: estudiante.email,
        curso_nombre: estudiante.Curso ? estudiante.Curso.nombre : null,
      });
    } catch (error) {
      console.error("Error al obtener el estudiante:", error);
      return reply.status(500).send({ message: "Error interno del servidor" });
    }
  }
}

export default EstudianteController;
