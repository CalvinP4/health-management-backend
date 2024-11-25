import { AppointmentService } from "../service/appointmentService";
import express, { Request, Response } from "express";

const router = express.Router();
const appointment = new AppointmentService();

router.get("/", async (req: Request, res: Response) => {  
  const appointments = await appointment.getAppointments();
  res.json(appointments);
});

router.get("/doctor/:doctorId", async (req: Request, res: Response) => {    
  const doctorId = Number(req.params.doctorId);
  const appointmentsByDoctorId = await appointment.getAppointmentsByDoctorId(doctorId);
  res.json(appointmentsByDoctorId);
});

router.get("/:id", async (req: Request, res: Response) => {  
  const id = Number(req.params.id);
  const appointmentById = await appointment.getAppointmentById(id);
  res.json(appointmentById);
});

router.post("/", async (req: Request, res: Response) => {
  const newAppointment = await appointment.createAppointment(req.body);
  res.json(newAppointment);
});

router.put("/", async (req: Request, res: Response) => {
  const updatedAppointment = await appointment.updateAppointment(req.body);
  res.json(updatedAppointment);
});

router.delete("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await appointment.deleteAppointment(id);
  res.json({ message: "Appointment deleted successfully" });
});

router.get("/patient/:patientId", async (req: Request, res: Response) => {
  const patientId = Number(req.params.patientId);
  const appointmentsByPatientId = await appointment.getAppointmentsByPatientId(patientId);
  res.json(appointmentsByPatientId);
});


router.get("/hospital/:hospitalId", async (req: Request, res: Response) => {
  const hospitalId = Number(req.params.hospitalId);
  const appointmentsByHospitalId = await appointment.getAppointmentsByHospitalId(hospitalId);
  res.json(appointmentsByHospitalId);
});

export default router;