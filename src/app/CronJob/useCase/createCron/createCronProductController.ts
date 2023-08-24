import { Request, Response } from 'express';
import 'reflect-metadata';
import { container } from 'tsyringe';
import { CreateCronProductUseCase } from './createCronProductUseCase';

class CreateCronProductController {
  async handle(request: Request, response: Response) {
    const createCronUseCase = container.resolve(CreateCronProductUseCase);

    const product = await createCronUseCase.execute();
    if (product) response.status(200).json();
    response.status(404).json();
  }
}

export { CreateCronProductController };
