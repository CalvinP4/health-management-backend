import { Hospital, HospitalCreationAttributes } from "../model/hospital";

export class HospitalService {
    public async getHospitals(): Promise<Hospital[]> {
        return await Hospital.findAll();
    }

    public async getHospitalById(id: number): Promise<Hospital> {
        const hospital = await Hospital.findByPk(id);
        if (!hospital) {
            throw new Error("Hospital not found");
        }
        return hospital;
    }

    public async createHospital(hospital: HospitalCreationAttributes): Promise<Hospital> {
        return await Hospital.create(hospital);
    }

    public async updateHospital(hospital: Hospital): Promise<Hospital> {
        await Hospital.update(hospital, { where: { id: hospital.id } });
        const updatedHospital = await Hospital.findByPk(hospital.id);
        if (!updatedHospital) {
            throw new Error("Hospital not found");
        }
        return updatedHospital;
    }

    public async deleteHospital(id: number): Promise<void> {
        await Hospital.destroy({ where: { id } });
    }
}