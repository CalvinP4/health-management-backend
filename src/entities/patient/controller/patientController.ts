import { PatientService } from "../service/patientService";
import express, { Request, Response } from "express";

const router = express.Router();
const patient = new PatientService();

router.get("/", async (req: Request, res: Response) => {
  const patients = await patient.getPatients();
  res.json(patients);
});

router.get("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const patientById = await patient.getPatientById(id);
  res.json(patientById);
});

router.post("/", async (req: Request, res: Response) => {
  const newPatient = await patient.createPatient(req.body);
  res.json(newPatient);
});

router.put("/", async (req: Request, res: Response) => {
  const updatedPatient = await patient.updatePatient(req.body);
  res.json(updatedPatient);
});

router.patch("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const updatedPatient = await patient.patchPatientById(id, req.body);
  res.json(updatedPatient);
});

router.get("/:id", async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const patientById = await patient.getPatientById(id);
    res.json(patientById);
});

router.delete("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await patient.deletePatient(id);
  res.json({ message: "Patient deleted successfully" });
});

export default router;