import { IGetProductDTO } from '../dtos/IGetProductDTO';

interface IProductRepository {
  statusApi(): Promise<IGetProductDTO>;
  getProduct(code: string): Promise<void>;
  listProducts(): Promise<void>;
  deleteProduc(code: string): Promise<void>;
  updateProduct(code: string): Promise<void>;
}

export { IProductRepository };
