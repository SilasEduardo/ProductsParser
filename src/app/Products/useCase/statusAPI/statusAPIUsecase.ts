import 'reflect-metadata';

import { inject, injectable } from 'tsyringe';
import { IProductRepository } from '@app/Products/infra/IProductRepository';
import { AppError } from '../../../../shared/errors/AppError';

@injectable()
class StatusAPIUserCase {
  constructor(
    @inject('ProductRepository')
    private poductRepository: IProductRepository
  ) {}
  async execute() {
    const dataStatus = await this.poductRepository.statusApi();
    if (dataStatus) {
      return dataStatus;
    }

    throw new AppError('status sistema not exists');
  }
}

export { StatusAPIUserCase };
