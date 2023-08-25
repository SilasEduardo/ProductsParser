import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { ICronProductRepository } from '@app/CronJob/infra/ICronProductRepostory';
import { AppError } from '@shared/errors/AppError';

@injectable()
class CreateCronProductUseCase {
  constructor(
    @inject('CronProductRepository')
    private poductRepository: ICronProductRepository
  ) {}
  async execute() {
    const response = this.poductRepository.updateDB();
    if (!response) {
      throw new AppError('cron operation error');
    }
    return response;
  }
}

export { CreateCronProductUseCase };
