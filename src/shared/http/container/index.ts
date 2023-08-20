import { container } from 'tsyringe';
import { CronRepository } from 'app/CronJob/infra/mongoDb/repositories/CronRepository';
import { ICronRepository } from 'app/CronJob/infra/ICronRepostory';
import { IProductRepository } from '../../../app/Products/infra/IProductRepository';
import { PoductRepository } from '../../../app/Products/infra/mongoDb/repositories/PoductRepository';

container.registerSingleton<IProductRepository>(
  'PoductRepository',
  PoductRepository
);

container.registerSingleton<ICronRepository>('CronRepository', CronRepository);
