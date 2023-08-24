import 'reflect-metadata';

import { inject, injectable } from 'tsyringe';
import { IProductRepository } from '@app/Products/infra/IProductRepository';
import { AppError } from '../../../../shared/errors/AppError';

@injectable()
class UpdateProductUserCase {
  constructor(
    @inject('ProductRepository')
    private poductRepository: IProductRepository
  ) {}
  async execute(code: string, data: any) {
    const product = await this.poductRepository.updateProduct(code, data);

    if (product) {
      return product;
    }

    throw new AppError('product not exists');
  }
}

export { UpdateProductUserCase };
