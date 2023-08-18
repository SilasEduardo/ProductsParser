import { ICreateProductDTO } from '../dtos/ICreateProductDTO';

interface IProductRepository {
  create(data: ICreateProductDTO): Promise<void>;
}

export { IProductRepository };
