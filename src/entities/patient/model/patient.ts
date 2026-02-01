import {
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { Optional } from "sequelize";
import { Appointment } from "../../../entities/appointment/model/appointment";

interface PatientAttributes {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  dob: Date;
  age: number;
  email: string;
  phoneNo: string;
  address: string;
  password: string;
  history: object;
}

interface PatientCreationAttributes extends Optional<PatientAttributes, "id"> {}

@Table({
  tableName: "tbl_patient",
  timestamps: false, // Disable Sequelize from automatically adding `createdAt` and `updatedAt` columns
})
class Patient extends Model<PatientAttributes, PatientCreationAttributes> {
  @PrimaryKey
  @Column({ type: DataType.INTEGER, field: "id" })
  id: number;

  @Column({ field: "first_name" })
  firstName: string;

  @Column({ field: "middle_name" })
  middleName: string;

  @Column({ field: "last_name" })
  lastName: string;

  @Column({ field: "dob", type: DataType.DATE })
  dob: Date;

  @Column({ field: "age", type: DataType.SMALLINT })
  age: number;

  @Column({ field: "email" })
  email: string;

  @Column({ field: "phone_no" })
  phoneNo: string;

  @Column({ field: "address" })
  address: string;

  @Column({ field: "password" })
  password: string;

  @Column({ field: "history", type: DataType.JSON })
  history: object;

  @HasMany(() => Appointment)
  appointments: Appointment[];

  toJSON() {
    const values: any = Object.assign({}, this.get());
    if (values.password) delete values.password;
    return values;
  }
}

export { Patient, PatientCreationAttributes };
