class AtrasosController {
  constructor(service) {
    this.service = service;
  }

  async getAtrasosById(req, reply) {
    try {
      const { estudiante_id } = req.params;
      const estudianteAutenticado = req.estudiante; // Obtenemos el estudiante del token

      if (!estudiante_id) {
        return reply.status(400).send({ 
          error: "Falta el ID del estudiante",
          message: "El ID del estudiante es requerido" 
        });
      }

      // Verificar que el estudiante solo pueda ver sus propios atrasos
      if (estudianteAutenticado.estudiante_id !== parseInt(estudiante_id)) {
        return reply.status(403).send({
          error: "Acceso denegado",
          message: "No tienes permiso para ver los atrasos de otro estudiante"
        });
      }

      const atrasos = await this.service.getAtrasosByEstudianteId(estudiante_id);

      // Formatear la respuesta
      const response = {
        estudiante: {
          id: atrasos[0]?.estudiante?.estudiante_id,
          nombre: atrasos[0]?.estudiante?.nombre,
          rut: atrasos[0]?.estudiante?.rut
        },
        atrasos: atrasos.map(atraso => ({
          id: atraso.atraso_id,
          fecha: atraso.fecha,
          hora: atraso.hora,
          hora_registro: atraso.hora_registro,
          tipo: atraso.tipo,
          justificado: atraso.justificado,
          observaciones: atraso.observaciones
        }))
      };

      reply.send(response);
    } catch (error) {
      console.error("Error al obtener atrasos:", error);
      
      if (error.message === "Estudiante no encontrado") {
        return reply.status(404).send({ 
          error: "Estudiante no encontrado",
          message: "No se encontró el estudiante con el ID proporcionado" 
        });
      }

      reply.status(500).send({ 
        error: "Error interno del servidor",
        message: "Ocurrió un error al procesar la solicitud" 
      });
    }
  }
}

export default AtrasosController;
