import { AppError } from '../../src/shared/errors/AppError';
import { ProductRepositoryInmemory } from '../../src/app/Products/infra/mongoDb/in-memory/PoductRepositoryInMemory';
import { GetProductUserCase } from '../../src/app/Products/useCase/getProduct/getProducUserCase';

let deleteProductUserCase: GetProductUserCase;
let productRepositoryInmemory: ProductRepositoryInmemory;

describe('Get product', () => {
  beforeAll(() => {
    productRepositoryInmemory = new ProductRepositoryInmemory();
    deleteProductUserCase = new GetProductUserCase(productRepositoryInmemory);
  });

  it('should be able to return the product ', async () => {
    let product = await deleteProductUserCase.execute('17');
    if (product) {
      product = true;
    }
    expect(product).toBeTruthy();
  });
  it("don't should be possible to return product does not exist", async () => {
    expect(async () => {
      await deleteProductUserCase.execute('80');
    }).rejects.toBeInstanceOf(AppError);
  });
});
