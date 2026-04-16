import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';

import './src/config/env.js';
import { connectDB } from './src/config/db.js';
import { apiV1Router } from './src/routes/index.js';
import { swaggerSpec } from './src/docs/swagger.js';
import { notFoundHandler, errorHandler } from './src/middlewares/error.middleware.js';

const app = express();

app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(',') ?? ['http://localhost:5173'],
  credentials: true,
}));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 200 }));

app.get('/health', (_req, res) => {
  res.json({ success: true, message: 'API healthy' });
});

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/v1', apiV1Router);

app.use(notFoundHandler);
app.use(errorHandler);

const port = Number(process.env.PORT || 5000);

const startServer = async () => {
  await connectDB();

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
};

startServer();
