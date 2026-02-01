import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import patientController from './entities/patient/controller/patientController';
import doctorController from './entities/doctor/controller/doctorController';
import hospitalController from './entities/hospital/controller/hospitalController';
import appointmentController from './entities/appointment/controller/appointmentController';
import doctorDepartment from './entities/doctorDepartment/controller/doctorDepartmentController';
import departmentController from './entities/department/controller/departmentController';
import slotController from './entities/slot/controller/slotController';
import { initDatabase, sequelize } from './entities/config/db/DatabaseConfig';

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 3000;
const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:3001';

app.use(cors({ origin: corsOrigin }));
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/patient', patientController);
app.use('/doctor', doctorController);
app.use('/hospital', hospitalController);
app.use('/appointment', appointmentController);
app.use('/doctorDepartment', doctorDepartment);
app.use('/department', departmentController);
app.use('/slot', slotController);

app.get('/health', async (_req, res) => {
    try {
        await sequelize.authenticate();
        return res.status(200).json({ status: 'ok', db: 'up' });
    } catch (err) {
        return res.status(503).json({ status: 'fail', db: 'down' });
    }
});

let server: any;

async function startServer() {
    try {
        await initDatabase();
    } catch (err) {
        console.error('Database initialization failed, exiting.', err);
        process.exit(1);
    }

    server = app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });

    const shutdown = (signal: string) => {
        console.log(`Received ${signal}. Shutting down gracefully...`);
        if (server) {
            server.close(async () => {
                try {
                    await sequelize.close();
                    console.log('Database connection closed.');
                    process.exit(0);
                } catch (err) {
                    console.error('Error closing database connection', err);
                    process.exit(1);
                }
            });
            // Force exit if graceful shutdown takes too long
            setTimeout(() => {
                console.error('Forcing shutdown after timeout.');
                process.exit(1);
            }, 10000).unref();
        } else {
            process.exit(0);
        }
    };

    process.on('SIGINT', () => shutdown('SIGINT'));
    process.on('SIGTERM', () => shutdown('SIGTERM'));

    process.on('uncaughtException', (err) => {
        console.error('Uncaught Exception:', err);
        shutdown('uncaughtException');
    });

    process.on('unhandledRejection', (reason) => {
        console.error('Unhandled Rejection:', reason);
        shutdown('unhandledRejection');
    });
}

startServer();