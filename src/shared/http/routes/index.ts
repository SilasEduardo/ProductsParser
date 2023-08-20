import { Router } from 'express';

import { productsRoutes } from './product.routes';
import { cronRoutes } from './cron.routes';

const router = Router();

router.use('/products', productsRoutes);
router.use('/cron', cronRoutes);

export { router };
