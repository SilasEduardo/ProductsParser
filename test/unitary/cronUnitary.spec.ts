import { AppError } from '../../src/shared/errors/AppError';
import { CronProductRepositoryInMemory } from '../../src/app/CronJob/infra/mongoDb/in-memory/CronProductRepositoryInMemory';
import { CreateCronProductUseCase } from '../../src/app/CronJob/useCase/createCron/createCronProductUseCase';

let createCronUseCase: CreateCronProductUseCase;
let cronRepositoryInMemory: CronProductRepositoryInMemory;

describe('Create product', () => {
  beforeAll(() => {
    cronRepositoryInMemory = new CronProductRepositoryInMemory();
    createCronUseCase = new CreateCronProductUseCase(cronRepositoryInMemory);
  });

  it('Must return success if checker is true', async () => {
    const product = await createCronUseCase.execute();
    expect(product).toBeTruthy();
  });

  it('Should throw an error if checker is false', async () => {
    const product = await createCronUseCase.execute();
    if (!product) {
      expect(async () => {
        await createCronUseCase.execute();
      }).rejects.toBeInstanceOf(AppError);
    }
  });
});
