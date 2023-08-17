import dotenv from 'dotenv';
import express from 'express';

import { router } from './shared/http/routes';

dotenv.config();

const app = express();
app.use(express.json());
app.use(router);

export { app };
