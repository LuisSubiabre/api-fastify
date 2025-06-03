import AsistenciaController from "../controllers/asistencia.controller.js";
import AsistenciaService from "../services/asistencia.service.js";
import authHook from "../hooks/auth.hook.js";

const asistenciaService = new AsistenciaService();
const asistenciaController = new AsistenciaController(asistenciaService);

const routes = [
  {
    method: "GET",
    url: "/asistencia/:estudiante_id",
    preHandler: authHook,
    handler: asistenciaController.getAsistenciaById.bind(asistenciaController),
  },
];

export default routes;
