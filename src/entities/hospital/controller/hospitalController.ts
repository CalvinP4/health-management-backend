import { HospitalService } from "../service/hospitalService";
import express, { Request, Response } from "express";

const router = express.Router();
const hospital = new HospitalService();

router.get("/", async (req: Request, res: Response) => {
  const hospitals = await hospital.getHospitals();
  res.json(hospitals);
});

router.get("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const hospitalById = await hospital.getHospitalById(id);
  res.json(hospitalById);
});

router.post("/", async (req: Request, res: Response) => {
  const newHospital = await hospital.createHospital(req.body);
  res.json(newHospital);
});

router.put("/", async (req: Request, res: Response) => {
  const updatedHospital = await hospital.updateHospital(req.body);
  res.json(updatedHospital);
});

router.delete("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await hospital.deleteHospital(id);
  res.json({ message: "Hospital deleted successfully" });
});

export default router;