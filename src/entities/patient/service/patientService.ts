import { Patient, PatientCreationAttributes } from "../model/patient";

export class PatientService {
    public async getPatients(): Promise<Patient[]> {
        return await Patient.findAll();
    }

    public async getPatientById(id: number): Promise<Patient> {
        const patient = await Patient.findByPk(id);
        if (!patient) {
            throw new Error("Patient not found");
        }
        return patient;
    }

    public async createPatient(patient: PatientCreationAttributes): Promise<Patient> {
        return await Patient.create(patient);
    }

    public async updatePatient(patient: Patient): Promise<Patient> {
        await Patient.update(patient, { where: { id: patient.id } });
        const updatedPatient = await Patient.findByPk(patient.id);
        if (!updatedPatient) {
            throw new Error("Patient not found");
        }
        return updatedPatient;
    }

    public async deletePatient(id: number): Promise<void> {
        await Patient.destroy({ where: { id } });
    }
}