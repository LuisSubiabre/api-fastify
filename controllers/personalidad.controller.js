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

      // Verificar si el estudiante está definido
      if (!personalidad[0].estudiante) {
        return reply.code(404).send({
          success: false,
          message: "Estudiante no encontrado",
        });
      }

      // Formatear la respuesta para incluir el nombre del estudiante, del curso y del profesor jefe
      const response = {
        estudiante_id: personalidad[0].estudiante.dataValues.estudiante_id,
        nombre_estudiante: personalidad[0].estudiante.dataValues.nombre,
        rut_estudiante: personalidad[0].estudiante.dataValues.rut,
        curso_nombre: personalidad[0].estudiante.Curso.dataValues.nombre,
        profesor_jefe_nombre: personalidad[0].estudiante.Curso.profesor_jefe?.dataValues?.nombre || "No asignado",
        informes: personalidad.map((item) => ({
          informe_id: item.informe_id,
          anio: item.anio,
          formacion_etica: {
            formacion_etica_1: item.formacion_etica_1,
            formacion_etica_2: item.formacion_etica_2,
            formacion_etica_3: item.formacion_etica_3,
            formacion_etica_4: item.formacion_etica_4,
            formacion_etica_5: item.formacion_etica_5,
            formacion_etica_6: item.formacion_etica_6,
            formacion_etica_7: item.formacion_etica_7,
            formacion_etica_8: item.formacion_etica_8,
          },
          crecimiento: {
            crecimiento_1: item.crecimiento_1,
            crecimiento_2: item.crecimiento_2,
            crecimiento_3: item.crecimiento_3,
            crecimiento_4: item.crecimiento_4,
            crecimiento_5: item.crecimiento_5,
          },
          entorno: {
            entorno_1: item.entorno_1,
            entorno_2: item.entorno_2,
            entorno_3: item.entorno_3,
            entorno_4: item.entorno_4,
            entorno_5: item.entorno_5,
            entorno_6: item.entorno_6,
            entorno_7: item.entorno_7,
          },
          aprendizaje: {
            aprendizaje_1: item.aprendizaje_1,
            aprendizaje_2: item.aprendizaje_2,
            aprendizaje_3: item.aprendizaje_3,
            aprendizaje_4: item.aprendizaje_4,
            aprendizaje_5: item.aprendizaje_5,
            aprendizaje_6: item.aprendizaje_6,
            aprendizaje_7: item.aprendizaje_7,
          },
          conductas: {
            conductas_1: item.conductas_1,
            conductas_2: item.conductas_2,
            conductas_3: item.conductas_3,
            conductas_4: item.conductas_4,
            conductas_5: item.conductas_5,
            conductas_6: item.conductas_6,
            conductas_7: item.conductas_7,
          },
          observaciones: item.observaciones,
          estado: item.estado,
          fecha_creacion: item.fecha_creacion,
          fecha_actualizacion: item.fecha_actualizacion,
        })),
      };

      return reply.code(200).send({
        success: true,
        data: response,
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
