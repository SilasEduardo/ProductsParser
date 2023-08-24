import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { ICronProductRepository } from '@app/CronJob/infra/ICronProductRepostory';

@injectable()
class CreateCronProductUseCase {
  constructor(
    @inject('CronProductRepository')
    private poductRepository: ICronProductRepository
  ) {}
  async execute() {
    const product = await this.poductRepository.updateDB();
    return product;
  }
}

export { CreateCronProductUseCase };
