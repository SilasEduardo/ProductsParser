import { Request, Response } from 'express';
import 'reflect-metadata';
import { container } from 'tsyringe';
import { CreateCronProductUseCase } from './createCronProductUseCase';

class CreateCronProductController {
  async handle(request: Request, response: Response) {
    const createCronUseCase = container.resolve(CreateCronProductUseCase);
    createCronUseCase.execute();
    const randomApiKey = process.env.RANDOM_NUMBER || '';
    response.setHeader('x-api-key', randomApiKey);
    response.status(200).json();
  }
}

export { CreateCronProductController };
