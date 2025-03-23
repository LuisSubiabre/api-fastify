import AtrasosController from "../controllers/atrasos.controller.js";
import AtrasosService from "../services/atrasos.service.js"; // Importamos el servicio
import authHook from "../hooks/auth.hook.js"; // Importamos el hook de autenticación

const atrasosService = new AtrasosService(); // Creamos instancia del servicio
const atrasosController = new AtrasosController(atrasosService); // Pasamos el servicio al controlador

const routes = [
  {
    method: "GET",
    url: "/atrasos/:estudiante_id",
    preHandler: authHook, // Agregamos el hook de autenticación
    handler: atrasosController.getAtrasosById.bind(atrasosController), // 🔥 Necesario para mantener `this`
  },
];

export default routes;
