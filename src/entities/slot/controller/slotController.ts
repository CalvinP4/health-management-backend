import { SlotService } from "../service/slotService";
import express, { Request, Response } from "express";

const router = express.Router();
const slot = new SlotService();

router.get("/", async (req: Request, res: Response) => {  
  const slots = await slot.getSlots();
  res.json(slots);
});

router.get("/:id", async (req: Request, res: Response) => {  
  const id = Number(req.params.id);
  const slotById = await slot.getSlotById(id);
  res.json(slotById);
});

router.post("/", async (req: Request, res: Response) => {
  const newSlot = await slot.createSlot(req.body);
  res.json(newSlot);
});

router.put("/", async (req: Request, res: Response) => {
  const updatedSlot = await slot.updateSlot(req.body);
  res.json(updatedSlot);
});

router.delete("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await slot.deleteSlot(id);
  res.json({ message: "Slot deleted successfully" });
});

router.get("/doctor/:doctorId", async (req: Request, res: Response) => {
  const doctorId = Number(req.params.doctorId);
  const slotsByDoctorId = await slot.getSlotsByDoctorId(doctorId);
  res.json(slotsByDoctorId);
});

router.get("/hospital/:hospitalId", async (req: Request, res: Response) => {
  const hospitalId = Number(req.params.hospitalId);
  const slotsByHospitalId = await slot.getSlotsByHospitalId(hospitalId);
  res.json(slotsByHospitalId);
});

router.get("/doctor/:doctorId/date/:date", async (req: Request, res: Response) => {
  const doctorId = Number(req.params.doctorId);
  const date = req.params.date as string;
  console.log(doctorId, date);
  
  const slots = await slot.getSlotsByDoctorIdAndDate(doctorId, date);
  res.json(slots);
});

export default router;