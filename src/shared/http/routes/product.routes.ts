import { Router } from 'express';
import { StatusAPIController } from 'app/Products/useCase/statusAPI/statusAPIController';

const productsRoutes = Router();

const statusAPIController = new StatusAPIController();

productsRoutes.get('/', statusAPIController.handle);

export { productsRoutes };
