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
    SELECT d.*
    FROM tbl_doctor d
    INNER JOIN tbl_doctor_departments dd ON d.id = dd.tbl_doctor_id
    INNER JOIN tbl_department dep ON dd.tbl_department_id = dep.id
    WHERE dep.tbl_hospital_id = :hospitalId;
  `;

    const doctors = await sequelize.query(query, {
      replacements: { hospitalId },
      type: QueryTypes.SELECT,
      model: Doctor,
      mapToModel: true,
    });

    return doctors;
  };
}
