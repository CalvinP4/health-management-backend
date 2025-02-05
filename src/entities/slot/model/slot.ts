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
import { Hospital } from "../../../entities/hospital/model/hospital";


interface SlotAttributes {
  id: number;
  startTime: string;
  endTime: string;
  slotDate: Date;
  doctorId: number;
  hospitalId: number;
}

interface SlotCreationAttributes extends Optional<SlotAttributes, "id"> {}

@Table({
  tableName: "tbl_slot",
  timestamps: false, // Disable Sequelize from automatically adding `createdAt` and `updatedAt` columns
})
class Slot extends Model {
  @PrimaryKey
  @Column({ type: DataType.INTEGER, field: "id" })
  id: number;

  @Column({ field: "start_time", type: DataType.TIME })
  startTime: string;

  @Column({ field: "end_time", type: DataType.TIME })
  endTime: string;

  @Column({ field: "slot_date", type: DataType.DATE })
  slotDate: Date;

  @ForeignKey(() => Doctor)
  @Column({ field: "tbl_doctor_id" })
  doctorId: number;

  @ForeignKey(() => Hospital)
  @Column({ field: "tbl_hospital_id" })
  hospitalId: number;
}

export { Slot, SlotAttributes, SlotCreationAttributes };