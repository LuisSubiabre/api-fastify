import { DataTypes } from "sequelize";
import db from "../config/db.js";
import EstudianteModel from "./estudiante.model.js";

const PersonalidadModel = db.define(
  "informes_personalidad",
  {
    informe_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    estudiante_id: {
      type: DataTypes.INTEGER,
      unique: true,
      references: {
        model: EstudianteModel,
        key: "estudiante_id",
      },
      onDelete: "CASCADE",
    },
    anio: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    // I. FORMACIÓN ÉTICA
    formacion_etica_1: {
      type: DataTypes.STRING(20),
      defaultValue: "Siempre",
    },
    formacion_etica_2: {
      type: DataTypes.STRING(20),
      defaultValue: "Siempre",
    },
    formacion_etica_3: {
      type: DataTypes.STRING(20),
      defaultValue: "Siempre",
    },
    formacion_etica_4: {
      type: DataTypes.STRING(20),
      defaultValue: "Siempre",
    },
    formacion_etica_5: {
      type: DataTypes.STRING(20),
      defaultValue: "Siempre",
    },
    formacion_etica_6: {
      type: DataTypes.STRING(20),
      defaultValue: "Siempre",
    },
    formacion_etica_7: {
      type: DataTypes.STRING(20),
      defaultValue: "Siempre",
    },
    formacion_etica_8: {
      type: DataTypes.STRING(20),
      defaultValue: "Siempre",
    },

    // II. CRECIMIENTO Y AUTOAFIRMACIÓN PERSONAL
    crecimiento_1: {
      type: DataTypes.STRING(20),
      defaultValue: "Siempre",
    },
    crecimiento_2: {
      type: DataTypes.STRING(20),
      defaultValue: "Siempre",
    },
    crecimiento_3: {
      type: DataTypes.STRING(20),
      defaultValue: "Siempre",
    },
    crecimiento_4: {
      type: DataTypes.STRING(20),
      defaultValue: "Siempre",
    },
    crecimiento_5: {
      type: DataTypes.STRING(20),
      defaultValue: "Siempre",
    },

    // III. LA PERSONA Y SU ENTORNO
    entorno_1: {
      type: DataTypes.STRING(20),
      defaultValue: "Siempre",
    },
    entorno_2: {
      type: DataTypes.STRING(20),
      defaultValue: "Siempre",
    },
    entorno_3: {
      type: DataTypes.STRING(20),
      defaultValue: "Siempre",
    },
    entorno_4: {
      type: DataTypes.STRING(20),
      defaultValue: "Siempre",
    },
    entorno_5: {
      type: DataTypes.STRING(20),
      defaultValue: "Siempre",
    },
    entorno_6: {
      type: DataTypes.STRING(20),
      defaultValue: "Siempre",
    },
    entorno_7: {
      type: DataTypes.STRING(20),
      defaultValue: "Siempre",
    },

    // IV. ÁREA DE APRENDIZAJE
    aprendizaje_1: {
      type: DataTypes.STRING(20),
      defaultValue: "Siempre",
    },
    aprendizaje_2: {
      type: DataTypes.STRING(20),
      defaultValue: "Siempre",
    },
    aprendizaje_3: {
      type: DataTypes.STRING(20),
      defaultValue: "Siempre",
    },
    aprendizaje_4: {
      type: DataTypes.STRING(20),
      defaultValue: "Siempre",
    },
    aprendizaje_5: {
      type: DataTypes.STRING(20),
      defaultValue: "Siempre",
    },
    aprendizaje_6: {
      type: DataTypes.STRING(20),
      defaultValue: "Siempre",
    },
    aprendizaje_7: {
      type: DataTypes.STRING(20),
      defaultValue: "Siempre",
    },

    // V. CONDUCTAS PREOCUPANTES
    conductas_1: {
      type: DataTypes.STRING(20),
      defaultValue: "No observado",
    },
    conductas_2: {
      type: DataTypes.STRING(20),
      defaultValue: "No observado",
    },
    conductas_3: {
      type: DataTypes.STRING(20),
      defaultValue: "No observado",
    },
    conductas_4: {
      type: DataTypes.STRING(20),
      defaultValue: "No observado",
    },
    conductas_5: {
      type: DataTypes.STRING(20),
      defaultValue: "No observado",
    },
    conductas_6: {
      type: DataTypes.STRING(20),
      defaultValue: "No observado",
    },
    conductas_7: {
      type: DataTypes.STRING(20),
      defaultValue: "No observado",
    },

    observaciones: {
      type: DataTypes.TEXT,
    },

    estado: {
      type: DataTypes.STRING(20),
      defaultValue: "creado",
      validate: {
        isIn: [["creado", "modificado"]],
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
    tableName: "informes_personalidad",
    indexes: [
      {
        unique: true,
        fields: ["estudiante_id", "anio"],
        name: "unq_informe_estudiante_anio",
      },
    ],
  }
);

// Definir la asociación
PersonalidadModel.belongsTo(EstudianteModel, {
  foreignKey: "estudiante_id",
  as: "estudiante",
});

export default PersonalidadModel;
