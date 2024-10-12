import { DoctorDepartment, DoctorDepartmentCreationAttributes } from "../model/doctorDepartment";

export class DoctorDepartmentService {
    public async getDoctorDepartments(): Promise<DoctorDepartment[]> {
        return await DoctorDepartment.findAll();
    }

    public async getDoctorDepartmentById(doctorId: number, departmentId: number): Promise<DoctorDepartment> {
        const doctorDepartment = await DoctorDepartment.findOne({ where: { doctorId, departmentId } });
        if (!doctorDepartment) {
            throw new Error("Doctor department not found");
        }
        return doctorDepartment;
    }

    public async createDoctorDepartment(doctorDepartment: DoctorDepartmentCreationAttributes): Promise<DoctorDepartment> {
        return await DoctorDepartment.create(doctorDepartment);
    }

    public async deleteDoctorDepartment(doctorId: number, departmentId: number): Promise<void> {
        await DoctorDepartment.destroy({ where: { doctorId, departmentId } });
    }
}