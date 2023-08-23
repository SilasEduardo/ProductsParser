import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { ICronRepository } from '@app/CronJob/infra/ICronRepostory';

@injectable()
class CreateCronUseCase {
  constructor(
    @inject('CronRepository')
    private poductRepository: ICronRepository
  ) {}
  async execute() {
    const product = await this.poductRepository.updateDB();

    return product;
  }
}

export { CreateCronUseCase };
