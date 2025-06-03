import { DataTypes } from "sequelize";
import db from "../config/db.js";
import EstudianteModel from "./estudiante.model.js";

const AsistenciaModel = db.define(
  "asistencia_estudiantes",
  {
    asistencia_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    estudiante_id: {
      type: DataTypes.INTEGER,
      references: {
        model: EstudianteModel,
        key: "estudiante_id",
      },
      onDelete: "CASCADE",
    },
    mes: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 12,
      },
    },
    anio: {
      type: DataTypes.INTEGER,
      validate: {
        min: 2000,
        max: new Date().getFullYear(),
      },
    },
    total_dias: {
      type: DataTypes.INTEGER,
    },
    dias_asistidos: {
      type: DataTypes.INTEGER,
    },
    porcentaje_asistencia: {
      type: DataTypes.DECIMAL(5, 2),
    },
    fecha_registro: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
    tableName: "asistencia_estudiantes",
  }
);

// Definir la asociación
AsistenciaModel.belongsTo(EstudianteModel, {
  foreignKey: "estudiante_id",
  as: "estudiante",
});

export default AsistenciaModel;
