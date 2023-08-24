import { Router } from 'express';

import { CreateCronProductController } from '@app/CronJob/useCase/createCron/createCronProductController';

const cronRoutes = Router();

const createCronProductController = new CreateCronProductController();

cronRoutes.post('/', createCronProductController.handle);

export { cronRoutes };
