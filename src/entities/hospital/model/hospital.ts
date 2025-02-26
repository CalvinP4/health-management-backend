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
import { Department } from "../../../entities/department/model/department";

interface HospitalAttributes {
  id: number;
  name: string;
  county: string;
  state: string;
  bedsTotal: number;
  bedsAvailable: number;
}

interface HospitalCreationAttributes
  extends Optional<HospitalAttributes, "id"> {}

@Table({
    tableName: "tbl_hospital",
    timestamps: false,
    })
class Hospital extends Model {
    @PrimaryKey
    @Column({ type: DataType.INTEGER, field: "id" })
    id: number;

    @Column({ field: "name" })
    name: string;

    @Column({ field: "county" })
    county: string;

    @Column({ field: "state" })
    state: string;

    @Column({ field: "beds_total" })
    bedsTotal: number;

    @Column({ field: "beds_available" })
    bedsAvailable: number;

    @HasMany(() => Appointment)
    appointments: Appointment[];

    @HasMany(() => Department)
    departments: Department[];
}

export { Hospital, HospitalAttributes, HospitalCreationAttributes };