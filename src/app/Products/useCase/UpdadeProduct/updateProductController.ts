import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateProductUserCase } from './updateProductUserCase';

class UpdateProductController {
  async handle(request: Request, response: Response) {
    const { code } = request.params;
    const { ...data } = request.body;

    const updateProductController = container.resolve(UpdateProductUserCase);
    await updateProductController.execute(code, data);
    response.status(200).send();
  }
}

export { UpdateProductController };
