import { DataTypes } from "sequelize";
import db from "../config/db.js";

const CursoModel = db.define(
  "Curso",
  {
    curso_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    indice: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    codigo_ensenanza: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    profesor_jefe_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "usuarios", // Tabla usuarios
        key: "usuario_id",
      },
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
    tableName: "cursos",
  }
);

export default CursoModel;
