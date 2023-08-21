import { Router } from 'express';

import { CreateCronController } from 'app/CronJob/useCase/createCron/createCronController';

const cronRoutes = Router();

const createCronController = new CreateCronController();

cronRoutes.post('/', createCronController.handle);

export { cronRoutes };
