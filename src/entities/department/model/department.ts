import {
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { Optional } from "sequelize";
import { Hospital } from "../../../entities/hospital/model/hospital";

interface DepartmentAttributes {
  id: number;
  name: string;
  hospitalId: number;
}

interface DepartmentCreationAttributes extends Optional<DepartmentAttributes, "id"> {}

@Table({
  tableName: "tbl_department",
  timestamps: false,
})
class Department extends Model {
  @PrimaryKey
  @Column({ type: DataType.INTEGER, field: "id" })
  id: number;

  @Column({ field: "name" })
  name: string;

  @ForeignKey(() => Hospital)
  @Column({ field: "tbl_hospital_id" })
  hospitalId: number;
}

export { Department, DepartmentAttributes, DepartmentCreationAttributes };