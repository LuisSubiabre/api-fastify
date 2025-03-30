import { DataTypes } from "sequelize";
import db from "../config/db.js";
import TallerCursoModel from "./tallerCurso.model.js";
import TallerEstudianteModel from "./tallerEstudiante.model.js";

const TallerModel = db.define(
  "talleres",
  {
    taller_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING(255),
    },
    horario: {
      type: DataTypes.STRING(100),
    },
    nivel: {
      type: DataTypes.ENUM("pre-basica", "basica", "media"),
    },
    ubicacion:
    {
      type: DataTypes.STRING(100),
    },
    cantidad_cupos: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cantidad_inscritos: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    profesor_id: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    fecha_creacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    fecha_actualizacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
    tableName: "talleres",
  }
);

// Definir la relación con TallerCursoModel
TallerModel.hasMany(TallerCursoModel, {
  foreignKey: "taller_id", // Clave foránea en la tabla talleres_cursos
  sourceKey: "taller_id", // Clave primaria en la tabla talleres
});

// Definir la relación con TallerEstudianteModel
TallerModel.hasMany(TallerEstudianteModel, {
  foreignKey: "taller_id", // Clave foránea en la tabla taller_estudiante
  sourceKey: "taller_id", // Clave primaria en la tabla talleres
});

export default TallerModel;
