import { PatientService } from "../service/patientService";
import express, { Request, Response } from "express";

const router = express.Router();
const patientService = new PatientService();

router.get("/", async (req: Request, res: Response) => {
  try {
    const patients = await patientService.getPatients();
    res.json(patients);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });
  try {
    const patientById = await patientService.getPatientById(id);
    res.json(patientById);
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
    const newPatient = await patientService.createPatient(req.body);
    res.status(201).location(`/patient/${newPatient.id}`).json(newPatient);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: "Email and password are required" });
  try {
    const patient = await patientService.authenticate(email, password);
    res.json(patient);
  } catch (err: any) {
    console.error(err);
    return res.status(401).json({ error: err.message || "Invalid credentials" });
  }
});

router.put("/", async (req: Request, res: Response) => {
  try {
    const updatedPatient = await patientService.updatePatient(req.body);
    res.json(updatedPatient);
  } catch (err: any) {
    console.error(err);
    if (err.message && err.message.toLowerCase().includes("not found")) {
      return res.status(404).json({ error: err.message });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.patch("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });
  try {
    const updatedPatient = await patientService.patchPatientById(id, req.body);
    res.json(updatedPatient);
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
    await patientService.deletePatient(id);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;