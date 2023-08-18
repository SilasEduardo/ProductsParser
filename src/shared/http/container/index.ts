import { container } from 'tsyringe';
import { IProductRepository } from '../../../app/Products/infra/IProductRepository';
import { PoductRepository } from '../../../app/Products/infra/mongoDb/repositories/PoductRepository';

container.registerSingleton<IProductRepository>(
  'PoductRepository',
  PoductRepository
);
