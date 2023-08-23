import { Request, Response } from 'express';
import 'reflect-metadata';
import { container } from 'tsyringe';
import { CreateCronUseCase } from './createCronUseCase';

class CreateCronController {
  handle(request: Request, response: Response) {
    const createCronUseCase = container.resolve(CreateCronUseCase);

    createCronUseCase.execute();
    response.status(200).json();
  }
}

export { CreateCronController };
