import { Router } from 'express';

import { CreateCronProductController } from '@app/CronJob/useCase/createCron/createCronProductController';

const cronRoutes = Router();

const createCronProductController = new CreateCronProductController();

cronRoutes.get('/cron', createCronProductController.handle);

export { cronRoutes };
