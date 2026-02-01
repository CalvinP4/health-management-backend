import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { Optional } from "sequelize";

interface DoctorAttributes {
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
  specialization: string;
  licensedYear: Date;
  licensedBy: string;
}

interface DoctorCreationAttributes extends Optional<DoctorAttributes, "id"> {}

@Table({
  tableName: "tbl_doctor",
  timestamps: false, // Disable Sequelize from automatically adding `createdAt` and `updatedAt` columns
})
class Doctor extends Model<DoctorAttributes, DoctorCreationAttributes> {
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
    
    @Column({ field: "specialization" })
    specialization: string;
    
    @Column({ field: "licensed_year" })
    licensedYear: Date;
    
    @Column({ field: "licensed_by" })
    licensedBy: string;

    @Column({field: "rating"})
    rating: number;

    toJSON() {
        const values: any = Object.assign({}, this.get());
        if (values.password) delete values.password;
        return values;
    }
}


export { Doctor, DoctorCreationAttributes };