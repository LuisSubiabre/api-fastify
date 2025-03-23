import EstudianteController from "../controllers/estudiante.controller.js";
import EstudianteService from "../services/estudiante.service.js"; // Importa el servicio
import authHook from "../hooks/auth.hook.js";

const estudianteService = new EstudianteService(); // Crea una instancia del servicio

const routes = [
  {
    method: "GET",
    url: "/estudiante",
    preHandler: authHook, // Agrega el hook de autenticación
    handler: async (req, res) => {
      res.status(200).send({ status: "OK - GET estudiantes" });
    },
  },
  {
    method: "GET",
    url: "/estudiante/:id",
    preHandler: authHook, // Agrega el hook de autenticación
    handler: async (req, res) => {
      const estudianteController = new EstudianteController({
        EstudianteService: estudianteService, // Pasa el servicio al controlador
      });
      return await estudianteController.getEstudianteById(req, res);
    },
  },
];

export default routes;
