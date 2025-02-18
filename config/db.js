import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config(); // Cargar variables de entorno desde .env

class DBInstance {
  constructor() {
    this.sequelize = new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: "postgres",
        logging: false,
      }
    );
  }
}

export default new DBInstance().sequelize;
