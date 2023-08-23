import { CronProductRepositoryInMemory } from '../../infra/mongoDb/in-memory/CronProductRepositoryInMemory';
import { CreateCronProductUseCase } from './createCronProductUseCase';

let createCronUseCase: CreateCronProductUseCase;
let cronRepositoryInMemory: CronProductRepositoryInMemory;
describe('Create product', () => {
  beforeAll(() => {
    cronRepositoryInMemory = new CronProductRepositoryInMemory();
    createCronUseCase = new CreateCronProductUseCase(cronRepositoryInMemory);
  });

  it('shoult be able create a new product', () => {
    const check = createCronUseCase.execute();

    expect(check).toBeTruthy();
  });
});
