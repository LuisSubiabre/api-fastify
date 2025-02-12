import AuthController from "../controllers/auth.controller.js";
import AuthService from "../services/auth.service.js";

const authService = new AuthService();
const authController = new AuthController({ AuthService: authService });

const routes = [
  {
    method: "POST",
    url: "/login",
    handler: (req, reply) => authController.login(req, reply),
  },
  {
    method: "POST",
    url: "/verify-token",
    handler: (req, reply) => authController.verifyToken(req, reply),
  },
];

export default routes;
