import { DataTypes } from "sequelize";
import db from "../config/db.js";
import UsuarioModel from "./usuario.model.js";

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
        model: UsuarioModel,
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

// Definir la relación con el profesor jefe
CursoModel.belongsTo(UsuarioModel, {
  foreignKey: "profesor_jefe_id",
  as: "profesor_jefe",
});

export default CursoModel;
