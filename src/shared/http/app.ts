import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import database from './database';
import { AppError } from '../errors/AppError';
import './container';
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

async function startServe() {
  try {
    await database.connect();
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
    return;
  }
  app.use(router);
  app.use(express.json());
  app.use(cors());
  serverErro();
}
startServe();
export { app };
