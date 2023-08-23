import { CronRepositoryInMemory } from '../../infra/mongoDb/in-memory/CronRepositoryInMemory';
import { CreateCronUseCase } from './createCronUseCase';

let createCronUseCase: CreateCronUseCase;
let cronRepositoryInMemory: CronRepositoryInMemory;
describe('Create product', () => {
  beforeAll(() => {
    cronRepositoryInMemory = new CronRepositoryInMemory();
    createCronUseCase = new CreateCronUseCase(cronRepositoryInMemory);
  });

  it('shoult be able create a new product', () => {
    const check = createCronUseCase.execute();

    expect(check).toBeTruthy();
  });
});
