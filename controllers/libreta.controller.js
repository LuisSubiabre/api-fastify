import LibretaModel from "../models/libreta.model.js";

class LibretaController {
  constructor({ LibretaService }) {
    this._libretaService = LibretaService;
  }
  async getLibretaById(req, reply) {
    const { id } = req.params;

    try {
      const libreta = await this._libretaService.findOne({
        where: { libreta_id: id },
        include: {
          model: LibretaModel,
          attributes: ["nombre"],
        },
      });

      if (!libreta) {
        return reply.status(404).send({ message: "Libreta no encontrada" });
      }

      return reply.status(200).send({
        libreta_id: libreta.libreta_id,
        nombre: libreta.nombre,
        rut: libreta.rut,
        email: libreta.email,
        libreta_nombre: libreta.Libreta ? libreta.Libreta.nombre : null,
      });
    } catch (error) {
      console.error("Error al obtener la libreta:", error);
      return reply.status(500).send({ message: "Error interno del servidor" });
    }
  }
}
