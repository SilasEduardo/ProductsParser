import { Router } from 'express';

import { productsRoutes, statusRouter } from './product.routes';
import { cronRoutes } from './cron.routes';

const router = Router();

router.use('/products', productsRoutes);
router.use('/', statusRouter);
router.use('/cron', cronRoutes);

export { router };
