import 'reflect-metadata';

import { inject, injectable } from 'tsyringe';
import { IProductRepository } from '@app/Products/infra/IProductRepository';
import { AppError } from '../../../../shared/errors/AppError';

@injectable()
class DeleteProductUserCase {
  constructor(
    @inject('ProductRepository')
    private poductRepository: IProductRepository
  ) {}
  async execute(code: string) {
    const product = await this.poductRepository.deleteProduct(code);

    if (product) {
      return product;
    }

    throw new AppError('Category does not exist');
  }
}

export { DeleteProductUserCase };
