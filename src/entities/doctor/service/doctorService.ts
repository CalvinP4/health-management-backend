import { Doctor, DoctorCreationAttributes } from "../model/doctor";


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
}