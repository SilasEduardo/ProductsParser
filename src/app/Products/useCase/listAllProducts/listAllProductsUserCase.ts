import 'reflect-metadata';

import { inject, injectable } from 'tsyringe';
import { IProductRepository } from '@app/Products/infra/IProductRepository';

@injectable()
class ListAllProductUserCase {
  constructor(
    @inject('ProductRepository')
    private poductRepository: IProductRepository
  ) {}
  execute() {
    const product = this.poductRepository.listProducts();
    return product;
  }
}

export { ListAllProductUserCase };
