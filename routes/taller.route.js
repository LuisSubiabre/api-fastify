import TallerController from "../controllers/taller.controller.js";
import TallerService from "../services/taller.service.js";
import authHook from "../hooks/auth.hook.js";

const tallerService = new TallerService();
const tallerController = new TallerController({ TallerService: tallerService });

const routes = [
  {
    method: "GET",
    url: "/talleres/:curso_id",
    preHandler: authHook,
    handler: (req, reply) => tallerController.getTalleresByCursoId(req, reply),
  },
  {
    method: "POST",
    url: "/talleres",
    preHandler: authHook,
    handler: (req, reply) => tallerController.inscribirEstudiante(req, reply),
  },
  {
    method: "DELETE",
    url: "/talleres",
    preHandler: authHook,
    handler: (req, reply) => tallerController.retirarEstudiante(req, reply),
  },
  {
    method: "GET",
    url: "/talleres/estudiante/:estudiante_id",
    preHandler: authHook,
    handler: (req, reply) => tallerController.getTalleresInscritos(req, reply),
  },
];

export default routes;
