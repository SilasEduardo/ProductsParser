import { inject, injectable } from 'tsyringe';
import { IProductRepository } from 'app/Products/infra/IProductRepository';

@injectable()
class StatusAPIUserCase {
  constructor(
    @inject('PoductRepository')
    private poductRepository: IProductRepository
  ) {}
  async execute() {
    const dataStatus = await this.poductRepository.statusApi();
    return dataStatus;
  }
}

export { StatusAPIUserCase };
