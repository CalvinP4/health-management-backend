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
import { Department } from "../../../entities/department/model/department";

interface DoctorDepartmentAttributes {
  doctorId: number;
  departmentId: number;
}

interface DoctorDepartmentCreationAttributes extends Optional<DoctorDepartmentAttributes, 'doctorId' | 'departmentId'> {}


@Table({
  tableName: "tbl_doctor_departments",
  timestamps: false,
})
class DoctorDepartment extends Model {
  @PrimaryKey
  @ForeignKey(() => Doctor)
  @Column({ field: "tbl_doctor_id" })
  doctorId: number;

  @PrimaryKey
  @ForeignKey(() => Department)
  @Column({ field: "tbl_department_id" })
  departmentId: number;
}

export { DoctorDepartment, DoctorDepartmentCreationAttributes, DoctorDepartmentAttributes };
