import LibretaController from "../controllers/libreta.controller.js";
import LibretaService from "../services/libreta.service.js";
import authHook from "../hooks/auth.hook.js";

const libretaService = new LibretaService();
const libretaController = new LibretaController({
  LibretaService: libretaService,
});

const routes = [
  {
    method: "GET",
    url: "/libreta/:estudiante_id",
    preHandler: authHook,
    handler: (req, res) => libretaController.getLibretaById(req, res),
  },
];

export default routes;
