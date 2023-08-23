import { inject, injectable } from 'tsyringe';
import { IProductRepository } from '@app/Products/infra/IProductRepository';

@injectable()
class UpdateProductUserCase {
  constructor(
    @inject('ProductRepository')
    private poductRepository: IProductRepository
  ) {}
  async execute(code: string, data: any) {
    await this.poductRepository.updateProduct(code, data);
  }
}

export { UpdateProductUserCase };
