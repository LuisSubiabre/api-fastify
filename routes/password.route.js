import PasswordController from "../controllers/password.controller.js";
import PasswordService from "../services/password.service.js";

const passwordService = new PasswordService();
const passwordController = new PasswordController({
  PasswordService: passwordService,
});

const routes = [
  {
    method: "POST",
    url: "/recuperar-clave",
    handler: (req, reply) => passwordController.recuperarClave(req, reply),
  },
];

export default routes;
