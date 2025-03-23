import { DataTypes } from "sequelize";
import db from "../config/db.js";
import EstudianteModel from "./estudiante.model.js";

const AtrasoModel = db.define(
  "atrasos_estudiantes",
  {
    atraso_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    estudiante_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: EstudianteModel,
        key: "estudiante_id",
      },
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    hora: {
      type: DataTypes.TIME,
      defaultValue: DataTypes.NOW,
    },
    tipo: {
      type: DataTypes.ENUM("leve", "moderado", "grave"),
      allowNull: false,
    },
    justificado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    observaciones: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    fecha_registro: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
  }
);

// Definir la relación con el modelo de Estudiante
AtrasoModel.belongsTo(EstudianteModel, {
  foreignKey: "estudiante_id",
  as: "estudiante",
});

export default AtrasoModel; 