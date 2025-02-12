import { Sequelize } from "sequelize";

class DBInstance {
  constructor() {
    const dbCgf = {
      user: "admindb",
      host: "149.50.146.106",
      database: "liceo",
      password: "gaga70LAla",
      port: 5432,
    };
    this.sequelize = new Sequelize(dbCgf.database, dbCgf.user, dbCgf.password, {
      host: dbCgf.host,
      dialect: "postgres",
      logging: false,
    });
  }
}

export default new DBInstance().sequelize;
