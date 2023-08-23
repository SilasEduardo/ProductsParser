import { inject, injectable } from 'tsyringe';
import { IProductRepository } from '@app/Products/infra/IProductRepository';

@injectable()
class GetProductUserCase {
  constructor(
    @inject('ProductRepository')
    private poductRepository: IProductRepository
  ) {}
  execute(code: string) {
    const product = this.poductRepository.getProduct(code);
    return product;
  }
}

export { GetProductUserCase };
