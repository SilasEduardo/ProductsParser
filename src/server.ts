import 'reflect-metadata';
import dotenv from 'dotenv';
import express from 'express';
import './shared/http/container';
import database from '@shared/http/database';
// import '@config/cronConfig';
import { router } from './shared/http/routes';

dotenv.config();
const app = express();
app.use(express.json());

async function startServe() {
  try {
    await database.connect();
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
    return;
  }
  app.use(router);
  app.use(express.json());
}

startServe();
export { app };
