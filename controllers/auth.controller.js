class AuthController {
  constructor({ AuthService }) {
    this._authService = AuthService;
  }

  async login(req, reply) {
    const { email, clave } = req.body;

    try {
      const token = await this._authService.autenticar(email, clave);
      return reply.status(200).send({ token });
    } catch (error) {
      console.error("Error en la autenticación:", error);
      return reply.status(401).send({ message: error.message });
    }
  }

  async verifyToken(req, reply) {
    const token = req.headers.authorization; // Extraer el token del header sin "Bearer"
    console.log("Token:", token);
    if (!token) {
      return reply.status(401).send({ message: "Token no proporcionado" });
    }

    try {
      const isValid = await this._authService.verifyToken(token);
      return reply.status(200).send({ isValid });
    } catch (error) {
      console.error("Error verificando el token:", error);
      return reply.status(401).send({ message: "Token inválido" });
    }
  }
}

export default AuthController;
