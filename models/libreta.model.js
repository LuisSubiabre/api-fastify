import { DataTypes } from "sequelize";
import db from "../config/db.js";
import AsignaturaModel from "./asignatura.model.js";
import EstudianteModel from "./estudiante.model.js";

const LibretaModel = db.define(
  "estudiantes_asignaturas",
  {
    estudiante_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: EstudianteModel, // Usar el modelo directamente
        key: "estudiante_id",
      },
      onDelete: "CASCADE",
    },
    asignatura_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: AsignaturaModel, // Usar el modelo directamente
        key: "asignatura_id",
      },
      onDelete: "CASCADE",
    },
    calificacion1: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    calificacion2: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    calificacion3: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    calificacion4: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    calificacion5: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    calificacion6: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    calificacion7: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    calificacion8: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    calificacion9: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    calificacion10: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    calificacion11: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    calificacion12: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    calificacion13: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    calificacion14: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    calificacion15: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    calificacion16: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    calificacion17: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    calificacion18: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    calificacion19: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    calificacion20: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    calificacion21: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    calificacion22: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    calificacion23: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    tableName: "estudiantes_asignaturas",
  }
);

// Relación con AsignaturaModel
LibretaModel.belongsTo(AsignaturaModel, {
  foreignKey: "asignatura_id",
  targetKey: "asignatura_id",
});

// Relación con EstudianteModel
LibretaModel.belongsTo(EstudianteModel, {
  foreignKey: "estudiante_id",
  targetKey: "estudiante_id",
});

export default LibretaModel;
