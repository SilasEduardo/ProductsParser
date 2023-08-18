import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateProductUseCase } from './createProductUseCase';

class CreateProductryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createProductUseCase = container.resolve(CreateProductUseCase);

    await createProductUseCase.execute(request.body);

    return response.status(201).send();
  }
}

export { CreateProductryController };
