import { DataTypes } from "sequelize";
import db from "../config/db.js";

const TallerEstudianteModel = db.define(
  "talleres_estudiantes",
  {
    taller_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    estudiante_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    fecha_inscripcion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
    tableName: "talleres_estudiantes",
  }
);

export default TallerEstudianteModel;
