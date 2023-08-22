import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { StatusAPIUserCase } from './statusAPIUsecase';

class StatusAPIController {
  async handle(request: Request, response: Response) {
    const statusApiUserCase = container.resolve(StatusAPIUserCase);
    const dataStatus = await statusApiUserCase.execute();
    response.status(200).json(dataStatus);
  }
}

export { StatusAPIController };
