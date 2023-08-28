import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { ListAllProductUserCase } from './listAllProductsUserCase';

class ListProductController {
  async handle(request: Request, response: Response) {
    const listProductController = container.resolve(ListAllProductUserCase);
    const product = await listProductController.execute();

    if (product) {
      response.status(200).json(product);
    } else {
      response.status(404).json({ message: 'Product not found' });
    }
  }
}

export { ListProductController };
