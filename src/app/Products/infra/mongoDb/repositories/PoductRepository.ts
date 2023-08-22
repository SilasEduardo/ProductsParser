import { Db, WithId } from 'mongodb';
import database from '@shared/http/database';
import { IGetProductDTO } from 'app/Products/dtos/IGetProductDTO';
import { timeExucute, getMemoryUsage } from '@shared/Utils/timeExeculte';
import { IProductRepository } from '../../IProductRepository';

class ProductRepository implements IProductRepository {
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

  // eslint-disable-next-line consistent-return
  async getProduct(code: string): Promise<WithId<Document> | null | undefined> {
    try {
      const db = await this.collectionPromise;
      const collections: any = await db.listCollections().toArray();

      for (const collectionInfo of collections) {
        const collectionName = collectionInfo.name;
        const collection = db.collection(collectionName);

        const productExist: any = await collection.findOne({ code });
        if (productExist) {
          return productExist;
        }
      }

      console.log('document does not exist.');
    } catch (error: any) {
      console.error('Erro:', error);
    }
  }

  async listProducts(): Promise<Array<any> | undefined> {
    try {
      const db = await this.collectionPromise;
      const collections: any = await db.listCollections().toArray();
      const allProducts: any[] = [];

      for (const collectionInfo of collections) {
        const collectionName = collectionInfo.name;
        const collection = db.collection(collectionName);

        const productsInCollection: any[] = await collection.find({}).toArray();
        allProducts.push(...productsInCollection);
      }

      if (allProducts.length > 1) {
        return allProducts;
      }

      console.log('document does not exist.');
    } catch (error: any) {
      console.error('Erro:', error);
    }
  }

  async deleteProduc(code: string): Promise<void> {
    try {
      const db = await this.collectionPromise;

      const collections: any = await db.listCollections().toArray();

      const status = ['trash'];
      const update = {
        $set: {
          status,
        },
      };
      for (const collectionInfo of collections) {
        const collectionName = collectionInfo.name;
        const collection = db.collection(collectionName);
        const result = await collection.updateOne({ code }, update);
        if (result.modifiedCount === 1) {
          console.log(`Document deleted in collection ${collectionName}.`);
          // Para interromper após a primeira exclusão bem-sucedida
        }
      }

      console.log('document does not exist.');
    } catch (error: any) {
      console.error('Erro:', error);
    }
  }

  async updateProduct(code: string, data: any): Promise<void> {
    try {
      const { product_name, quantity } = data;
      const db = await this.collectionPromise;
      const collections: any = await db.listCollections().toArray();
      const filter = { code };
      const update = {
        $set: {
          product_name,
          quantity,
        },
      };

      for (const collectionInfo of collections) {
        const collectionName = collectionInfo.name;
        const collection = db.collection(collectionName);

        const productE: any = await collection.updateOne(filter, update);
        if (productE.modifiedCount === 1) {
          console.log('Document successfully updated.');
          return;
        }
      }
      console.log('Document not found or not updated.');
    } catch (error: any) {
      console.error('Erro:', error);
    }
  }
}

export { ProductRepository };
