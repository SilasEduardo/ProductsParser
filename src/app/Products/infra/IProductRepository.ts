import { IGetProductDTO } from '../dtos/IGetProductDTO';

interface IProductRepository {
  statusApi(): Promise<IGetProductDTO>;
  getProduct(code: string): Promise<any | undefined>;
  listProducts(): Promise<Array<any> | undefined>;
  deleteProduct(code: string): Promise<boolean | undefined>;
  updateProduct(code: string, data: any): Promise<any>;
}

export { IProductRepository };
