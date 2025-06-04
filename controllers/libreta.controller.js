class LibretaController {
  constructor({ LibretaService }) {
    this._libretaService = LibretaService;
  }

  async getLibretaById(req, reply) {
    const { estudiante_id } = req.params;
    const estudianteAutenticado = req.estudiante;

    try {
      // Verificar que el estudiante solo pueda ver su propia libreta
      if (estudianteAutenticado.estudiante_id !== parseInt(estudiante_id)) {
        return reply.status(403).send({ 
          error: "Acceso denegado",
          message: "No tienes permiso para ver la libreta de otro estudiante" 
        });
      }

      const libreta = await this._libretaService.getLibretaById(estudiante_id);

      if (!libreta || libreta.length === 0) {
        return reply.status(404).send({ message: "Libreta no encontrada" });
      }

      // Verificar si el estudiante está definido
      if (!libreta[0].estudiante) {
        console.log("Estudiante no encontrado en la libreta:", libreta[0]);
        return reply.status(404).send({ message: "Estudiante no encontrado" });
      }

      // Formatear la respuesta para incluir el nombre del estudiante, del curso y del profesor jefe
      const response = {
        estudiante_id: libreta[0].estudiante.dataValues.estudiante_id,
        nombre_estudiante: libreta[0].estudiante.dataValues.nombre,
        curso_nombre: libreta[0].estudiante.Curso.dataValues.nombre,
        profesor_jefe_nombre: libreta[0].estudiante.Curso.profesor_jefe?.dataValues?.nombre || "No asignado",
        asignaturas: libreta.map((item) => ({
          asignatura_id: item.asignatura_id,
          indice: item.asignatura.dataValues.indice,
          concepto: item.asignatura.dataValues.concepto,
          nombre_asignatura: item.asignatura.dataValues.nombre,
          calificacion1: item.calificacion1,
          calificacion2: item.calificacion2,
          calificacion3: item.calificacion3,
          calificacion4: item.calificacion4,
          calificacion5: item.calificacion5,
          calificacion6: item.calificacion6,
          calificacion7: item.calificacion7,
          calificacion8: item.calificacion8,
          calificacion9: item.calificacion9,
          calificacion10: item.calificacion10,
          calificacion11: item.calificacion11,
          calificacion12: item.calificacion12,
          calificacion13: item.calificacion13,
          calificacion14: item.calificacion14,
          calificacion15: item.calificacion15,
          calificacion16: item.calificacion16,
          calificacion17: item.calificacion17,
          calificacion18: item.calificacion18,
          calificacion19: item.calificacion19,
          calificacion20: item.calificacion20,
          calificacion21: item.calificacion21,
          calificacion22: item.calificacion22,
          calificacion23: item.calificacion23,
        })),
      };

      return reply.status(200).send(response);
    } catch (error) {
      console.error("Error al obtener la libreta:", error);
      return reply.status(500).send({ message: "Error interno del servidor" });
    }
  }
}

export default LibretaController;
