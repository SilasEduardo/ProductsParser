import { Db } from 'mongodb';
import database from '@shared/http/database';
import { IGetProductDTO } from 'app/Products/dtos/IGetProductDTO';
import { timeExucute, getMemoryUsage } from '@shared/Utils/timeExeculte';
import { IProductRepository } from '../../IProductRepository';

class PoductRepository implements IProductRepository {
  private collectionPromise: Promise<Db>;

  constructor() {
    this.collectionPromise = this.initCollection();
  }

  private async initCollection(): Promise<Db> {
    const client = await database.connect();
    const db = client.db();
    return db;
  }
  async statusApi(): Promise<IGetProductDTO> {
    const db = await this.collectionPromise;
    const collection = await db.collection('import_history');
    const documents = await collection.find({}).toArray();
    const document = documents[documents.length - 1];

    const dataStatus = {
      lastCronTime: document.import_date.hour,
      runtime: timeExucute(),
      memoryInUse: getMemoryUsage(),
    };
    return dataStatus;
  }

  getProduct(code: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  listProducts(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  deleteProduc(code: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  updateProduct(code: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

export { PoductRepository };
