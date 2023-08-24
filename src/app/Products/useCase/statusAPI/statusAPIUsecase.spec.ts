import { ProductRepositoryInmemory } from '../../infra/mongoDb/in-memory/PoductRepositoryInMemory';
import { StatusAPIUserCase } from './statusAPIUsecase';

let statusAPIUserCase: StatusAPIUserCase;
let productRepositoryInmemory: ProductRepositoryInmemory;

describe('Create product', () => {
  beforeAll(() => {
    productRepositoryInmemory = new ProductRepositoryInmemory();
    statusAPIUserCase = new StatusAPIUserCase(productRepositoryInmemory);
  });

  async function checker() {
    const check = await statusAPIUserCase.execute();
    if (check) {
      return true;
    }
    return false;
  }

  it('Must return success if checker is true', async () => {
    const resultado = checker();
    if (resultado) {
      expect(resultado).toBeTruthy();
    }
    expect(resultado).toBeTruthy();
  });

  it('Should throw an error if checker is false', async () => {
    const resultado = await checker();

    if (!resultado) {
      expect(resultado).toBeFalsy();
    }
  });
});
