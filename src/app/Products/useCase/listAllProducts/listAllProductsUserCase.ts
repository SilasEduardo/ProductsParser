import 'reflect-metadata';

import { inject, injectable } from 'tsyringe';
import { IProductRepository } from '@app/Products/infra/IProductRepository';
import { AppError } from '../../../../shared/errors/AppError';

@injectable()
class ListAllProductUserCase {
  constructor(
    @inject('ProductRepository')
    private poductRepository: IProductRepository
  ) {}
  execute() {
    const products = this.poductRepository.listProducts();
    if (products) {
      return products;
    }

    throw new AppError('Database does not have an instance');
  }
}

export { ListAllProductUserCase };
