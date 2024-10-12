import { Department, DepartmentCreationAttributes } from "../model/department";

export class DepartmentService {
    public async getDepartments(): Promise<Department[]> {
        return await Department.findAll();
    }

    public async getDepartmentById(id: number): Promise<Department> {
        const department = await Department.findByPk(id);
        if (!department) {
            throw new Error("Department not found");
        }
        return department;
    }

    public async createDepartment(department: DepartmentCreationAttributes): Promise<Department> {
        return await Department.create(department);
    }

    public async updateDepartment(department: Department): Promise<Department> {
        await Department.update(department, { where: { id: department.id } });
        const updatedDepartment = await Department.findByPk(department.id);
        if (!updatedDepartment) {
            throw new Error("Department not found");
        }
        return updatedDepartment;
    }

    public async deleteDepartment(id: number): Promise<void> {
        await Department.destroy({ where: { id } });
    }

    public async getDepartmentsByHospitalId(hospitalId: number): Promise<Department[]> {
        return await Department.findAll({ where: { hospitalId } });
    }
}