import authHook from "../hooks/auth.hook.js";
import PersonalidadService from "../services/personalidad.service.js";
import PersonalidadController from "../controllers/personalidad.controller.js";

//const asistenciaService = new AsistenciaService();
//const asistenciaController = new AsistenciaController(asistenciaService);
const personalidadService = new PersonalidadService();
const personalidadController = new PersonalidadController(personalidadService);


const routes = [
  {
    method: "GET",
    url: "/personalidad/:estudiante_id",
    preHandler: authHook,
    handler: (req, res) => personalidadController.getPersonalidadById(req, res),
  },
];

export default routes;
