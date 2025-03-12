class PasswordController {
  constructor({ PasswordService }) {
    this._passwordService = PasswordService;
  }

  async recuperarClave(req, reply) {
    const { rut } = req.body;

    if (!rut) {
      return reply.status(400).send({ message: "El RUT es requerido" });
    }

    try {
      const resultado = await this._passwordService.recuperarClave(rut);
      return reply.status(200).send(resultado);
    } catch (error) {
      console.error("Error en la recuperación de contraseña:", error);
      return reply.status(400).send({ message: error.message });
    }
  }
}

export default PasswordController;
