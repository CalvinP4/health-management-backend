import {
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { Optional } from "sequelize";
import { Doctor } from "@app/entities/doctor/model/doctor";
import { Patient } from "@app/entities/patient/model/patient";
import { Hospital } from "@app/entities/hospital/model/hospital";

interface AppointmentAttributes {
    id: number;
    doctorId: number;
    patientId: number;
    hospitalId: number;
    startTime: Date;
    endTime: Date;
    type: string;
    status: string;
    reason: string;
    notes: string;
    symptoms: string;
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
    @Column({ field: "doctor_id" })
    doctorId: number;
    
    @ForeignKey(() => Patient)
    @Column({ field: "patient_id" })
    patientId: number;
    
    @ForeignKey(() => Hospital)
    @Column({ field: "hospital_id" })
    hospitalId: number;
    
    @Column({ field: "start_time", type: DataType.DATE })
    startTime: Date;
    
    @Column({ field: "end_time", type: DataType.DATE })
    endTime: Date;
    
    @Column({ field: "type" })
    type: string;
    
    @Column({ field: "status" })
    status: string;
    
    @Column({ field: "reason" })
    reason: string;
    
    @Column({ field: "notes" })
    notes: string;
    
    @Column({ field: "symptoms" })
    symptoms: string;
}

export { Appointment, AppointmentAttributes, AppointmentCreationAttributes };