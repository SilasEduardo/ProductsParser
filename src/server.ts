import dotenv from 'dotenv';
import express from 'express';

import { connectToDatabase } from './shared/http/database';
import { router } from './shared/http/routes';

dotenv.config();
const app = express();
app.use(express.json());

async function startServe() {
  try {
    await connectToDatabase();
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
    return;
  }
  app.use(router);
}

startServe();
export { app };
