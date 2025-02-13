import TallerModel from "../models/taller.model.js";
import TallerCursoModel from "../models/tallerCurso.model.js";
import TallerEstudianteModel from "../models/tallerEstudiante.model.js";

class TallerService {
  // Listar talleres correspondientes al curso del estudiante
  async getTalleresByCursoId(curso_id) {
    return await TallerModel.findAll({
      include: [
        {
          model: TallerCursoModel,
          where: { curso_id },
          attributes: [], // No necesitamos los atributos de TallerCursoModel
        },
      ],
    });
  }

  // Inscribir a un estudiante en un taller
  async inscribirEstudiante(taller_id, estudiante_id) {
    const taller = await TallerModel.findByPk(taller_id);

    if (!taller) {
      throw new Error("Taller no encontrado");
    }

    // Verificar si hay cupos disponibles
    if (taller.cantidad_inscritos >= taller.cantidad_cupos) {
      throw new Error("No hay cupos disponibles en este taller");
    }

    // Inscribir al estudiante
    await TallerEstudianteModel.create({ taller_id, estudiante_id });

    // Actualizar la cantidad de inscritos
    await TallerModel.update(
      { cantidad_inscritos: taller.cantidad_inscritos + 1 },
      { where: { taller_id } }
    );

    return { message: "Estudiante inscrito correctamente" };
  }

  // Retirar a un estudiante de un taller
  async retirarEstudiante(taller_id, estudiante_id) {
    const taller = await TallerModel.findByPk(taller_id);

    if (!taller) {
      throw new Error("Taller no encontrado");
    }

    // Retirar al estudiante
    const result = await TallerEstudianteModel.destroy({
      where: { taller_id, estudiante_id },
    });

    if (result === 0) {
      throw new Error("El estudiante no está inscrito en este taller");
    }

    // Actualizar la cantidad de inscritos
    await TallerModel.update(
      { cantidad_inscritos: taller.cantidad_inscritos - 1 },
      { where: { taller_id } }
    );

    return { message: "Estudiante retirado correctamente" };
  }
}

export default TallerService;
