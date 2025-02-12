import sequelize from "sequelize";
import db from "../config/db.js";
import CursoModel from "./curso.model.js";
import bcrypt from "bcrypt";

const EstudianteModel = db.define(
  "estudiante",
  {
    estudiante_id: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: sequelize.STRING,
      allowNull: false,
    },
    rut: {
      type: sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    curso_id: {
      type: sequelize.INTEGER,
      references: {
        model: "cursos", // Nombre de la tabla a la que hace referencia
        key: "curso_id", // Nombre de la clave primaria de la tabla 'cursos'
      },
      onDelete: "CASCADE", // Comportamiento de eliminación en cascada
    },
    numlista: {
      type: sequelize.INTEGER,
      allowNull: true, // Si no es obligatorio, lo dejamos como true
    },
    email: {
      type: sequelize.STRING(150),
      allowNull: false,
      unique: true,
    },
    clave_email: {
      type: sequelize.STRING(250),
      allowNull: false,
    },
    clave: {
      type: sequelize.STRING(250),
      allowNull: false,
    },
    fecha_creacion: {
      type: sequelize.DATE,
      defaultValue: sequelize.NOW, // Para usar el valor por defecto del servidor
    },
    fecha_actualizacion: {
      type: sequelize.DATE,
      defaultValue: sequelize.NOW,
    },
    fecha_nacimiento: {
      type: sequelize.DATEONLY, // Solo la fecha (sin hora)
      allowNull: true,
    },
    fecha_ingreso: {
      type: sequelize.DATEONLY,
      allowNull: true,
    },
    activo: {
      type: sequelize.BOOLEAN,
      defaultValue: true, // Valor por defecto para el campo 'activo'
    },
  },
  {
    timestamps: false, // Si no quieres que Sequelize maneje los campos `createdAt` y `updatedAt`
    tableName: "estudiantes", // Nombre de la tabla en la base de datos
    hooks: {
      //Cifrando la contraseña
      beforeCreate: async (estudiante) => {
        const salt = await bcrypt.genSalt(10);
        estudiante.clave = await bcrypt.hash(estudiante.clave, salt);
      },
    },
  }
);

// Definir la relación "un estudiante pertenece a un curso"
EstudianteModel.belongsTo(CursoModel, {
  foreignKey: "curso_id", // El campo 'curso_id' en la tabla 'estudiantes'
  targetKey: "curso_id", // Relación con la clave primaria 'curso_id' de la tabla 'cursos'
});

// Método para comparar contraseñas
EstudianteModel.prototype.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.clave);
};

export default EstudianteModel;
