import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import patientController from './entities/patient/controller/patientController';
import doctorController from './entities/doctor/controller/doctorController';
import hospitalController from './entities/hospital/controller/hospitalController';
import appointmentController from './entities/appointment/controller/appointmentController';
import doctorDepartment from './entities/doctorDepartment/controller/doctorDepartmentController';
import departmentController from './entities/department/controller/departmentController';
import { initDatabase } from './entities/config/db/DatabaseConfig';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: 'http://localhost:3001' })); // Add this line to enable CORS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/patient', patientController);
app.use('/doctor', doctorController);
app.use('/hospital', hospitalController);
app.use('/appointment', appointmentController);
app.use('/doctorDepartment', doctorDepartment);
app.use('/department', departmentController);

app.listen(port, async () => {
    console.log(`Server is running on port ${port}`);
    await initDatabase();
});