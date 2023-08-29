import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import { createKey } from '@utils/createkey';
import swaggerFile from '../../swagger.json';
import database from '../database';
import { AppError } from '../errors/AppError';
import '../container';
// import '@config/cronConfig';
import { router } from './routes';

dotenv.config();
const app = express();

function serverErro() {
  app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
      if (err instanceof AppError) {
        return response.status(err.statusCode).json({
          message: err.message,
        });
      }

      return response.status(500).json({
        status: 'error',
        message: `Internal server error - ${err.message}`,
      });
    }
  );
}

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

async function startServe() {
  try {
    await database.connect();
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
    return;
  }
  app.use(cors());
  app.use(express.json());
  app.use(router);
  createKey();
  serverErro();
}
startServe();
export { app };
