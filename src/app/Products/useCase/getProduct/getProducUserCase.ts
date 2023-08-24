import 'reflect-metadata';

import { inject, injectable } from 'tsyringe';
import { IProductRepository } from '@app/Products/infra/IProductRepository';
import { AppError } from '../../../../shared/errors/AppError';

@injectable()
class GetProductUserCase {
  constructor(
    @inject('ProductRepository')
    private poductRepository: IProductRepository
  ) {}
  execute(code: string) {
    const product = this.poductRepository.getProduct(code);

    if (product) {
      return product;
    }

    throw new AppError('Error in Database');
  }
}

export { GetProductUserCase };
