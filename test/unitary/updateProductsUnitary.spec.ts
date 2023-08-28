import { AppError } from '../../src/shared/errors/AppError';
import { ProductRepositoryInmemory } from '../../src/app/Products/infra/mongoDb/in-memory/PoductRepositoryInMemory';
import { UpdateProductUserCase } from '../../src/app/Products/useCase/UpdadeProduct/updateProductUserCase';

let updateProductUserCase: UpdateProductUserCase;
let productRepositoryInmemory: ProductRepositoryInmemory;

describe('Update Product', () => {
  beforeAll(() => {
    productRepositoryInmemory = new ProductRepositoryInmemory();
    updateProductUserCase = new UpdateProductUserCase(
      productRepositoryInmemory
    );
  });

  it('should be able to change update product', async () => {
    const data = { product_name: 'test', quantity: '41' };
    const product = await updateProductUserCase.execute('17', data);
    expect(product).toBeTruthy();
  });
  it('não deveria ser possível atualizar o produto', async () => {
    expect(async () => {
      const data = { product_name: 'test', quantity: '41' };
      await updateProductUserCase.execute('50', data);
    }).rejects.toBeInstanceOf(AppError);
  });
});
