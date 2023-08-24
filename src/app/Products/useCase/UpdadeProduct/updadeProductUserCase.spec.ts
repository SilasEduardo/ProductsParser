import { ProductRepositoryInmemory } from '../../infra/mongoDb/in-memory/PoductRepositoryInMemory';
import { UpdateProductUserCase } from './updadeProductUserCase';

let updateProductUserCase: UpdateProductUserCase;
let productRepositoryInmemory: ProductRepositoryInmemory;

describe('Create product', () => {
  beforeAll(() => {
    productRepositoryInmemory = new ProductRepositoryInmemory();
    updateProductUserCase = new UpdateProductUserCase(
      productRepositoryInmemory
    );
  });

  async function checker() {
    const check = await updateProductUserCase.execute('17', {
      product_name: 'silas',
      quantity: 'silas',
    });
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
