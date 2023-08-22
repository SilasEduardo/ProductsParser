import { WithId } from 'mongodb';
import { IGetProductDTO } from '../dtos/IGetProductDTO';

interface IProductRepository {
  statusApi(): Promise<IGetProductDTO>;
  getProduct(code: string): Promise<WithId<Document> | null | undefined>;
  listProducts(): Promise<Array<any> | undefined>;
  deleteProduc(code: string): Promise<number | undefined>;
  updateProduct(code: string): Promise<void>;
}

export { IProductRepository };
