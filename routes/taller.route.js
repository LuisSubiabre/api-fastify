import TallerController from "../controllers/taller.controller.js";
import TallerService from "../services/taller.service.js";

const tallerService = new TallerService();
const tallerController = new TallerController({ TallerService: tallerService });

const routes = [
  {
    method: "GET",
    url: "/talleres/:curso_id",
    handler: (req, reply) => tallerController.getTalleresByCursoId(req, reply),
  },
  {
    method: "POST",
    url: "/talleres",
    handler: (req, reply) => tallerController.inscribirEstudiante(req, reply),
  },
  {
    method: "DELETE",
    url: "/talleres",
    handler: (req, reply) => tallerController.retirarEstudiante(req, reply),
  },
];

export default routes;
