import { Router } from 'express';
import { StatusAPIController } from 'app/Products/useCase/statusAPI/statusAPIController';
import { DeleteProductController } from 'app/Products/useCase/deleteProduct/deleteProductController';
import { GetProductController } from 'app/Products/useCase/getProduct/getProductController';
import { ListProductController } from 'app/Products/useCase/listAllProducts/listAllproductController';

const productsRoutes = Router();
const statusRouter = Router();

const statusAPIController = new StatusAPIController();
const deleteProductController = new DeleteProductController();
const getProductController = new GetProductController();
const listProductController = new ListProductController();

statusRouter.get('/', statusAPIController.handle);
productsRoutes.delete('/:code', deleteProductController.handle);
productsRoutes.get('/:code', getProductController.handle);
productsRoutes.get('/', listProductController.handle);

export { productsRoutes, statusRouter };
