import { container } from 'tsyringe';
import { CronProductRepository } from '@app/CronJob/infra/mongoDb/repositories/CronProductRepository';
import { ICronProductRepository } from '@app/CronJob/infra/ICronProductRepostory';
import { IProductRepository } from '@app/Products/infra/IProductRepository';
import { ProductRepository } from '@app/Products/infra/mongoDb/repositories/PoductRepository';

container.registerSingleton<IProductRepository>(
  'ProductRepository',
  ProductRepository
);

container.registerSingleton<ICronProductRepository>(
  'CronProductRepository',
  CronProductRepository
);
