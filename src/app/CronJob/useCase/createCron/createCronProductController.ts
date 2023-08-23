import { Request, Response } from 'express';
import 'reflect-metadata';
import { container } from 'tsyringe';
import { CreateCronProductUseCase } from './createCronProductUseCase';

class CreateCronProductController {
  handle(request: Request, response: Response) {
    const createCronUseCase = container.resolve(CreateCronProductUseCase);

    createCronUseCase.execute();
    response.status(200).json();
  }
}

export { CreateCronProductController };
