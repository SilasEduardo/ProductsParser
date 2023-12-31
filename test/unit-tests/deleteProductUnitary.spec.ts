import { AppError } from '../../src/shared/errors/AppError';
import { ProductRepositoryInmemory } from '../../src/app/Products/infra/mongoDb/in-memory/PoductRepositoryInMemory';
import { DeleteProductUserCase } from '../../src/app/Products/useCase/deleteProduct/deleteProductUserCase';

let deleteProductUserCase: DeleteProductUserCase;
let productRepositoryInmemory: ProductRepositoryInmemory;

describe('Delete ', () => {
  beforeAll(() => {
    productRepositoryInmemory = new ProductRepositoryInmemory();
    deleteProductUserCase = new DeleteProductUserCase(
      productRepositoryInmemory
    );
  });

  it('should be able to change status to trash', async () => {
    const product = await deleteProductUserCase.execute('17');
    expect(product).toBeTruthy();
  });
  it("don't should be possible to delete a product that doesn't exist", async () => {
    expect(async () => {
      await deleteProductUserCase.execute('80');
    }).rejects.toBeInstanceOf(AppError);
  });
});
