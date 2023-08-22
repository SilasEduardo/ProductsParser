import { inject, injectable } from 'tsyringe';
import { IProductRepository } from 'app/Products/infra/IProductRepository';

@injectable()
class DeleteProductUserCase {
  constructor(
    @inject('ProductRepository')
    private poductRepository: IProductRepository
  ) {}
  async execute(code: string) {
    const product = await this.poductRepository.deleteProduc(code);
    return product;
  }
}

export { DeleteProductUserCase };
