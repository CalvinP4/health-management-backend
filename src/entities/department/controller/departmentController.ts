import { DepartmentService } from "../service/departmentService";
import express, { Request, Response } from "express";

const router = express.Router();
const department = new DepartmentService();

router.get("/", async (req: Request, res: Response) => {
  const departments = await department.getDepartments();
  res.json(departments);
});

router.get("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const departmentById = await department.getDepartmentById(id);
  res.json(departmentById);
});

router.post("/", async (req: Request, res: Response) => {
  const newDepartment = await department.createDepartment(req.body);
  res.json(newDepartment);
});

router.put("/", async (req: Request, res: Response) => {
  const updatedDepartment = await department.updateDepartment(req.body);
  res.json(updatedDepartment);
});

router.delete("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await department.deleteDepartment(id);
  res.json({ message: "Department deleted successfully" });
});

router.get("/hospital/:hospitalId", async (req: Request, res: Response) => {
  const hospitalId = Number(req.params.hospitalId);
  const departmentsByHospitalId = await department.getDepartmentsByHospitalId(hospitalId);
  res.json(departmentsByHospitalId);
});

export default router;