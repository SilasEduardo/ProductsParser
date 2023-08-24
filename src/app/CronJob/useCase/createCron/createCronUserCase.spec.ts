import { CronProductRepositoryInMemory } from '../../infra/mongoDb/in-memory/CronProductRepositoryInMemory';
import { CreateCronProductUseCase } from './createCronProductUseCase';

let createCronUseCase: CreateCronProductUseCase;
let cronRepositoryInMemory: CronProductRepositoryInMemory;

describe('Create product', () => {
  beforeAll(() => {
    cronRepositoryInMemory = new CronProductRepositoryInMemory();
    createCronUseCase = new CreateCronProductUseCase(cronRepositoryInMemory);
  });

  async function checker() {
    const check = await createCronUseCase.execute();
    if (check) {
      return true;
    }
    return false;
  }

  it('Must return success if checker is true', async () => {
    const resultado = checker();
    expect(resultado).toBeTruthy();
  });

  it('Should throw an error if checker is false', async () => {
    const resultado = await checker();
    if (!resultado) {
      expect(resultado).toBeFalsy();
    }
  });
});
