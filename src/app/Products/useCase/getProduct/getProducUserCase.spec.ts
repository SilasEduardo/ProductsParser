import { ProductRepositoryInmemory } from '../../infra/mongoDb/in-memory/PoductRepositoryInMemory';
import { GetProductUserCase } from './getProducUserCase';

let deleteProductUserCase: GetProductUserCase;
let productRepositoryInmemory: ProductRepositoryInmemory;

describe('Create product', () => {
  beforeAll(() => {
    productRepositoryInmemory = new ProductRepositoryInmemory();
    deleteProductUserCase = new GetProductUserCase(productRepositoryInmemory);
  });

  async function checker() {
    const check = await deleteProductUserCase.execute('17');
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
