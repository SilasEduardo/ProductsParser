import { inject, injectable } from 'tsyringe';
import { ICronRepository } from '@app/CronJob/infra/ICronRepostory';

@injectable()
class CreateCronUseCase {
  constructor(
    @inject('CronRepository')
    private poductRepository: ICronRepository
  ) {}
  async execute() {
    await this.poductRepository.updateDB();
  }
}

export { CreateCronUseCase };
