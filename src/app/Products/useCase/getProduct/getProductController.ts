import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { GetProductUserCase } from './getProducUserCase';

class GetProductController {
  async handle(request: Request, response: Response) {
    const { code } = request.params;
    const getProductUserCase = container.resolve(GetProductUserCase);
    const product = await getProductUserCase.execute(code);

    if (product) {
      response.status(201).json(product);
    } else {
      response.status(404).json({ message: 'Product not found' });
    }
  }
}

export { GetProductController };
