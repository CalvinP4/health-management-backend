import { Sequelize } from "sequelize-typescript";
import { Patient } from "../../../entities/patient/model/patient";

export async function initDatabase(): Promise<void> {
  try {
    const sequelize = new Sequelize({
      database: process.env.DB_NAME,
      dialect: "mysql",
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      models: [Patient],
    });

    await sequelize.sync();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
