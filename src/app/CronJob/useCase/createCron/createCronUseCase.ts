import { inject, injectable } from 'tsyringe';
import { CronRepository } from 'app/CronJob/infra/mongoDb/repositories/CronRepository';
import { ICronRepository } from 'app/CronJob/infra/ICronRepostory';

@injectable()
class CreateCronUseCase {
  constructor(
    @inject('CronRepository')
    private poductRepository: ICronRepository
  ) {}
  execute() {
    const cronReposity = new CronRepository();
    cronReposity.updateDB();
  }
}

export { CreateCronUseCase };
