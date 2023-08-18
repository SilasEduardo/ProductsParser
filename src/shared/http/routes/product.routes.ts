import { Router } from 'express';
import { CreateProductryController } from 'app/Products/useCase/createProduct/createProductController';

const productsRoutes = Router();

const createProductController = new CreateProductryController();

productsRoutes.post('/', createProductController.handle);

export { productsRoutes };
