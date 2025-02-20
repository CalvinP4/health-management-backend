import { Appointment, AppointmentCreationAttributes } from "../model/appointment";

export class AppointmentService {
    public async getAppointments(): Promise<Appointment[]> {
        return await Appointment.findAll();
    }

    public async getAppointmentById(id: number): Promise<Appointment> {
        const appointment = await Appointment.findByPk(id);
        if (!appointment) {
            throw new Error("Appointment not found");
        }
        return appointment;
    }

    public async createAppointment(appointment: AppointmentCreationAttributes): Promise<Appointment> {
        return await Appointment.create(appointment);
    }

    public async updateAppointment(appointment: Appointment): Promise<Appointment> {
        console.log(appointment);
        
        await Appointment.update(appointment, { where: { id: appointment.id } });
        const updatedAppointment = await Appointment.findByPk(appointment.id);
        if (!updatedAppointment) {
            throw new Error("Appointment not found");
        }
        return updatedAppointment;
    }

    public async deleteAppointment(id: number): Promise<void> {
        await Appointment.destroy({ where: { id } });
    }

    public async getAppointmentsByPatientId(patientId: number): Promise<Appointment[]> {
        return await Appointment.findAll({ where: { patientId } });
    }

    public async getAppointmentsByDoctorId(doctorId: number): Promise<Appointment[]> {
        return await Appointment.findAll({ where: { doctorId } });
    }

    public async getAppointmentsByHospitalId(hospitalId: number): Promise<Appointment[]> {
        return await Appointment.findAll({ where: { hospitalId } });
    }
}