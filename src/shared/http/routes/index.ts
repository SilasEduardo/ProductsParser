import { Router } from 'express';

import { productsRoutes, statusRouter } from './product.routes';
import { authenticateAPIKey } from '../middlewares/authenticateAPIKey';
import { cronRoutes } from './cron.routes';

const router = Router();

router.use('/products', authenticateAPIKey, productsRoutes);
router.use('/', authenticateAPIKey, statusRouter);
router.use('/cron', authenticateAPIKey, cronRoutes);

export { router };
