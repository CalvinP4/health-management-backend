import express, {Request, Response} from 'express';
import dotenv from 'dotenv';
import patientController from './entities/patient/controller/patientController';
import { initDatabase } from './entities/config/db/DatabaseConfig';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/patient', patientController);

app.listen(port,async () => {
    console.log(`Server is running on port ${port}`);
    await initDatabase();
});