// Ruta para obtener promedios por curso
fastify.get(
  "/promedios/:curso_id",
  {
    schema: {
      params: {
        type: "object",
        required: ["curso_id"],
        properties: {
          curso_id: { type: "integer" }
        }
      }
    }
  },
  libretaController.getPromedioPorCurso.bind(libretaController)
); 