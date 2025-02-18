import { Doctor } from "../model/doctor";
import { DoctorService } from "../service/doctorService";
import express, { Request, Response } from "express";

const router = express.Router();
const doctor = new DoctorService();

router.get("/", async (req: Request, res: Response) => {  
  const doctors = await doctor.getDoctors();
  res.json(doctors);
});

router.get("/doctor-hospital", async (req: Request, res: Response) => {  
  const hospitalId = Number(req.query.hospitalId);
  console.log(hospitalId);
  
  const doctorsByHospitalId = await doctor.fetchDoctorsByHospitalId(hospitalId);
  res.json(doctorsByHospitalId);
});

router.get("/:id", async (req: Request, res: Response) => {  
  const id = Number(req.params.id);
  const doctorById = await doctor.getDoctorById(id);
  res.json(doctorById);
});

router.post("/", async (req: Request, res: Response) => {  
  const newDoctor = await doctor.createDoctor(req.body);
  res.json(newDoctor);
});

router.put("/", async (req: Request, res: Response) => {  
  const updatedDoctor = await doctor.updateDoctor(req.body);
  res.json(updatedDoctor);
});

router.delete("/:id", async (req: Request, res: Response) => {  
  const id = Number(req.params.id);
  await doctor.deleteDoctor(id);
  res.json({ message: "Doctor deleted successfully" });
});

router.patch("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const updatedDoctor = await doctor.patchDoctorById(req.body, id);
  res.json(updatedDoctor);
});


export default router;
