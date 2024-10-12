import { DoctorDepartmentService } from "../service/doctorDepartmentService";

import express, { Request, Response } from "express";

const router = express.Router();
const doctorDepartment = new DoctorDepartmentService();

router.get("/", async (req: Request, res: Response) => {
  const doctorDepartments = await doctorDepartment.getDoctorDepartments();
  res.json(doctorDepartments);
});

router.get("/:doctorId/:departmentId", async (req: Request, res: Response) => {
  const doctorId = Number(req.params.doctorId);
  const departmentId = Number(req.params.departmentId);
  const doctorDepartmentById = await doctorDepartment.getDoctorDepartmentById(doctorId, departmentId);
  res.json(doctorDepartmentById);
});

router.post("/", async (req: Request, res: Response) => {
  const newDoctorDepartment = await doctorDepartment.createDoctorDepartment(req.body);
  res.json(newDoctorDepartment);
});

router.delete("/:doctorId/:departmentId", async (req: Request, res: Response) => {
  const doctorId = Number(req.params.doctorId);
  const departmentId = Number(req.params.departmentId);
  await doctorDepartment.deleteDoctorDepartment(doctorId, departmentId);
  res.json({ message: "Doctor department deleted successfully" });
});

export default router;