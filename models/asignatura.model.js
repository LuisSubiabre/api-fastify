import { DataTypes } from "sequelize";
import db from "../config/db.js";

const AsignaturaModel = db.define(
  "asignaturas",
  {
    asignatura_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING(100),
    },
    indice: {
      type: DataTypes.INTEGER,
    },
    concepto: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    codigo_sige: {
      type: DataTypes.INTEGER,
    },
    nivel_educativo: {
      type: DataTypes.INTEGER,
    },
    es_comun: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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
    timestamps: false, // Desactiva los campos `createdAt` y `updatedAt`
    tableName: "asignaturas", // Nombre de la tabla en la base de datos
  }
);

export default AsignaturaModel;
