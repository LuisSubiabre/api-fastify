import { DataTypes } from "sequelize";
import db from "../config/db.js";

const LibretaModel = db.define(
  "EstudiantesAsignaturas",
  {
    estudiante_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: "estudiantes", // Tabla estudiantes
        key: "estudiante_id",
      },
      onDelete: "CASCADE",
    },
    asignatura_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: "asignaturas", // Tabla asignaturas
        key: "asignatura_id",
      },
      onDelete: "CASCADE",
    },
    fecha_asignacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    calificacion1: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    calificacion2: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    calificacion3: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    calificacion4: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    calificacion5: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    calificacion6: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    calificacion7: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    calificacion8: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    calificacion9: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    calificacion10: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    calificacion11: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    calificacion12: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    calificacion13: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    calificacion14: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    calificacion15: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    calificacion16: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    calificacion17: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    calificacion18: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    calificacion19: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    calificacion20: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    calificacion21: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    calificacion22: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    calificacion23: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    fecha_actualizacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
    tableName: "estudiantes_asignaturas",
  }
);

export default LibretaModel;
