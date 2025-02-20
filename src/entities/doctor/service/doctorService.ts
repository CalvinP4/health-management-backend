import { Doctor, DoctorCreationAttributes } from "../model/doctor";
import { sequelize } from "../../config/db/DatabaseConfig";
import { QueryTypes } from "sequelize";

export class DoctorService {
  public async getDoctors(): Promise<Doctor[]> {
    return await Doctor.findAll();
  }

  public async getDoctorById(id: number): Promise<Doctor> {
    const doctor = await Doctor.findByPk(id);
    if (!doctor) {
      throw new Error("Doctor not found");
    }
    return doctor;
  }

  public async createDoctor(doctor: DoctorCreationAttributes): Promise<Doctor> {
    return await Doctor.create(doctor);
  }

  public async updateDoctor(doctor: Doctor): Promise<Doctor> {
    await Doctor.update(doctor, { where: { id: doctor.id } });
    const updatedDoctor = await Doctor.findByPk(doctor.id);
    if (!updatedDoctor) {
      throw new Error("Doctor not found");
    }
    return updatedDoctor;
  }

  public async deleteDoctor(id: number): Promise<void> {
    await Doctor.destroy({ where: { id } });
  }

  public async patchDoctorById(doctor: Doctor, id: number): Promise<Doctor> {
    await Doctor.update(doctor, { where: { id } });
    const updatedDoctor = await Doctor.findByPk(id);
    if (!updatedDoctor) {
      throw new Error("Doctor not found");
    }
    return updatedDoctor;
  }

  public fetchDoctorsByHospitalId = async (hospitalId: number) => {
    if (!hospitalId) {
      throw new Error("Hospital ID is required");
    }

    const query = `
    SELECT 
      d.id,
      d.age,
      d.dob,
      d.email,
      d.password,
      d.address,
      d.specialization,
      d.rating,
      d.first_name,
      d.middle_name,
      d.last_name,
      d.phone_no,
      d.licensed_year,
      d.licensed_by
    FROM 
        tbl_doctor d
    JOIN 
        tbl_doctor_hospital dh ON d.id = dh.tbl_doctor_id
    JOIN 
        tbl_hospital h ON dh.tbl_hospital_id = h.id 
    WHERE 
        h.id = :hospitalId;
  `;

    const doctors = await sequelize.query(query, {
      replacements: { hospitalId },
      type: QueryTypes.SELECT,
      model: Doctor,
      mapToModel: true,
    });

    console.log(doctors);
    

    return doctors as Doctor[];
  };
}
