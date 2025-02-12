import EstudianteModel from "../models/estudiante.model.js";

class EstudianteService {
  async findOne(options) {
    return await EstudianteModel.findOne(options);
  }
}

export default EstudianteService;
