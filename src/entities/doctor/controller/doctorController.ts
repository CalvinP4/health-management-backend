import { Doctor } from "../model/doctor";
import { DoctorService } from "../service/doctorService";
import express, { Request, Response } from "express";

const router = express.Router();
const doctor = new DoctorService();

router.get("/", async (req: Request, res: Response) => {  
  try {
    const doctors = await doctor.getDoctors();
    res.json(doctors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/doctor-hospital", async (req: Request, res: Response) => {  
  const hospitalId = Number(req.query.hospitalId);
  if (Number.isNaN(hospitalId)) return res.status(400).json({ error: "Invalid hospitalId" });
  try {
    const doctorsByHospitalId = await doctor.fetchDoctorsByHospitalId(hospitalId);
    res.json(doctorsByHospitalId);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:id", async (req: Request, res: Response) => {  
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });
  try {
    const doctorById = await doctor.getDoctorById(id);
    res.json(doctorById);
  } catch (err: any) {
    console.error(err);
    if (err.message && err.message.toLowerCase().includes("not found")) {
      return res.status(404).json({ error: err.message });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/", async (req: Request, res: Response) => {  
  try {
    const newDoctor = await doctor.createDoctor(req.body);
    res.status(201).location(`/doctor/${newDoctor.id}`).json(newDoctor);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: "Email and password are required" });
  try {
    const authenticatedDoctor = await doctor.authenticate(email, password);
    res.json(authenticatedDoctor);
  } catch (err: any) {
    console.error(err);
    return res.status(401).json({ error: err.message || "Invalid credentials" });
  }
});

router.put("/", async (req: Request, res: Response) => {  
  try {
    const updatedDoctor = await doctor.updateDoctor(req.body);
    res.json(updatedDoctor);
  } catch (err: any) {
    console.error(err);
    if (err.message && err.message.toLowerCase().includes("not found")) {
      return res.status(404).json({ error: err.message });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {  
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });
  try {
    await doctor.deleteDoctor(id);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.patch("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });
  try {
    const updatedDoctor = await doctor.patchDoctorById(req.body, id);
    res.json(updatedDoctor);
  } catch (err: any) {
    console.error(err);
    if (err.message && err.message.toLowerCase().includes("not found")) {
      return res.status(404).json({ error: err.message });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
});


export default router;
