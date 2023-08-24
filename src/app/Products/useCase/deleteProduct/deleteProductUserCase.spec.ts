import { AppError } from '../../../../shared/errors/AppError';
import { ProductRepositoryInmemory } from '../../infra/mongoDb/in-memory/PoductRepositoryInMemory';
import { DeleteProductUserCase } from './deleteProductUserCase';

let deleteProductUserCase: DeleteProductUserCase;
let productRepositoryInmemory: ProductRepositoryInmemory;

describe('delete file', () => {
  beforeAll(() => {
    productRepositoryInmemory = new ProductRepositoryInmemory();
    deleteProductUserCase = new DeleteProductUserCase(
      productRepositoryInmemory
    );
  });

  it('should be able to change status to trash', async () => {
    const category = await deleteProductUserCase.execute('17');
    expect(category).toBeTruthy();
  });
  it("don't should be possible to delete a product that doesn't exist", async () => {
    expect(async () => {
      await deleteProductUserCase.execute('80');
    }).rejects.toBeInstanceOf(AppError);
  });
});