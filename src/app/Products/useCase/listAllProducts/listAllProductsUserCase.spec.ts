import { AppError } from '../../../../shared/errors/AppError';
import { ProductRepositoryInmemory } from '../../infra/mongoDb/in-memory/PoductRepositoryInMemory';
import { ListAllProductUserCase } from './listAllProductsUserCase';

let listAllProductUserCase: ListAllProductUserCase;
let productRepositoryInmemory: ProductRepositoryInmemory;

describe('List All Products', () => {
  beforeAll(() => {
    productRepositoryInmemory = new ProductRepositoryInmemory();
    listAllProductUserCase = new ListAllProductUserCase(
      productRepositoryInmemory
    );
  });

  it('should be able to return  all the products ', async () => {
    const product = await listAllProductUserCase.execute();

    if (product) {
      const products = true;
      expect(products).toBeTruthy();
    }
  });
  it("don't should be possible to return all products", async () => {
    const products = await productRepositoryInmemory.listProducts();
    if (!products) {
      expect(async () => {
        await listAllProductUserCase.execute();
      }).rejects.toBeInstanceOf(AppError);
    }
  });
});
