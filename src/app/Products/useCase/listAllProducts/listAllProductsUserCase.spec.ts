import { AppError } from '@shared/errors/AppError';
import { ProductRepositoryInmemory } from '../../infra/mongoDb/in-memory/PoductRepositoryInMemory';
import { ListAllProductUserCase } from './listAllProductsUserCase';

let listAllProductUserCase: ListAllProductUserCase;
let productRepositoryInmemory: ProductRepositoryInmemory;

describe('Create product', () => {
  beforeAll(() => {
    productRepositoryInmemory = new ProductRepositoryInmemory();
    listAllProductUserCase = new ListAllProductUserCase(
      productRepositoryInmemory
    );
  });

  it('should be able to return the product ', async () => {
    const product = await listAllProductUserCase.execute();

    expect(product).toBeTruthy();
  });
  it("don't should be possible to return product does not exist", async () => {
    expect(async () => {
      await listAllProductUserCase.execute();
    }).rejects.toBeInstanceOf(AppError);
  });
});
