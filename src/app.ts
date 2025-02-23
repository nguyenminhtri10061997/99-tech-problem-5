import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import 'reflect-metadata';
import { AppDataSource } from './data-source';
import EnvConfig from './env/envConfig';
import { authenticate } from './middlewares/authMiddleware';
import authRoutes from './routes/authRoutes';
import resourceRoutes from './routes/resourceRoutes';
import { globalErrorHandler } from './utils/globalErrorHandling';

const envConfig = EnvConfig.getInstance();
envConfig.validate()
    .then(() => {
        AppDataSource.initialize().then(() => {
            console.log('Database connected');

            const app = express();
            app.use(express.json());
            app.use(cors());
            app.use(helmet());

            app.use(authRoutes);
            app.use('/api', authenticate, resourceRoutes);
            app.use(globalErrorHandler);

            const port = envConfig.PORT || 3000;

            app.listen(port, () => {
                console.log(`Server running on http://localhost:${port}`);
            });
        }).catch(error => console.log(error));
    }).catch((error) => {
        console.error('Error loading environment variables:', error.message);
        process.exit(1);
    });
