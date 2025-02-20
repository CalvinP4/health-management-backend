import {
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { Optional } from "sequelize";
import { Doctor } from "../../../entities/doctor/model/doctor";
import { Patient } from "../../../entities/patient/model/patient";
import { Hospital } from "../../../entities/hospital/model/hospital";

interface AppointmentAttributes {
    id: number;
    doctorId: number;
    patientId: number;
    hospitalId: number;
    startTime: Date;
    endTime: Date;
    type: string;
    reason: string;
    notes: string;
    symptoms: string;
    status: string;
}

interface AppointmentCreationAttributes extends Optional<AppointmentAttributes, "id"> {}

@Table({
  tableName: "tbl_appointment",
  timestamps: false, // Disable Sequelize from automatically adding `createdAt` and `updatedAt` columns
})
class Appointment extends Model {
    @PrimaryKey
    @Column({ type: DataType.INTEGER, field: "id" })
    id: number;
    
    @ForeignKey(() => Doctor)
    @Column({ field: "tbl_doctor_id" })
    doctorId: number;
    
    @ForeignKey(() => Patient)
    @Column({ field: "tbl_patient_id" })
    patientId: number;
    
    @ForeignKey(() => Hospital)
    @Column({ field: "tbl_hospital_id" })
    hospitalId: number;
    
    @Column({ field: "start_time", type: DataType.DATE })
    startTime: Date;
    
   @Column({ field: "end_time", type: DataType.DATE })
    endTime: Date; 
    
    @Column({ field: "type" })
    type: string;
    
    @Column({ field: "reason" })
    reason: string;
    
    @Column({ field: "notes" })
    notes: string;
    
    @Column({ field: "symptoms" })
    symptoms: string;

    @Column({ field: "status" })
    status: string;
}

export { Appointment, AppointmentAttributes, AppointmentCreationAttributes };