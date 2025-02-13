import { DataTypes } from "sequelize";
import db from "../config/db.js";
import TallerModel from "./taller.model.js";

const TallerCursoModel = db.define(
  "talleres_cursos",
  {
    taller_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    curso_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  },
  {
    timestamps: false,
    tableName: "talleres_cursos",
  }
);

export default TallerCursoModel;
