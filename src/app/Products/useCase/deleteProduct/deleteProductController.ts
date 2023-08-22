import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { DeleteProductUserCase } from './deleteProductUserCase';

class DeleteProductController {
  async handle(request: Request, response: Response) {
    const { code } = request.params;
    const deleteProductUserCase = container.resolve(DeleteProductUserCase);
    const product = await deleteProductUserCase.execute(code);

    if (product) {
      response.status(204).send();
    } else {
      response.status(404).json({ message: 'Product not found' });
    }
  }
}

export { DeleteProductController };
