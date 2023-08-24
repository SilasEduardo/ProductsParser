import 'reflect-metadata';

import { inject, injectable } from 'tsyringe';
import { IProductRepository } from '@app/Products/infra/IProductRepository';

@injectable()
class UpdateProductUserCase {
  constructor(
    @inject('ProductRepository')
    private poductRepository: IProductRepository
  ) {}
  async execute(code: string, data: any) {
    const product = await this.poductRepository.updateProduct(code, data);
    return product;
  }
}

export { UpdateProductUserCase };
