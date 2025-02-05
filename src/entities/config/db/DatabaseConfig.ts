import { Sequelize } from "sequelize-typescript";
import { Patient } from "../../../entities/patient/model/patient";
import { Appointment } from "../../../entities/appointment/model/appointment";
import { Department } from "../../../entities/department/model/department";
import { Doctor } from "../../../entities/doctor/model/doctor";
import { DoctorDepartment } from "../../../entities/doctorDepartment/model/doctorDepartment";
import { Hospital } from "../../../entities/hospital/model/hospital";

import dotenv from 'dotenv';
import { Slot } from "../../../entities/slot/model/slot";

// Load environment variables from .env file
dotenv.config();


export const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  dialect: "mysql",
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  models: [Patient, Doctor, Hospital, Appointment, Department, DoctorDepartment, Slot],
});

export async function initDatabase(): Promise<void> {
  try {
    await sequelize.sync();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
