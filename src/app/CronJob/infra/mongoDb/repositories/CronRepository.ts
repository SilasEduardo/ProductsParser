import * as fs from 'fs';
import * as zlib from 'zlib';
import * as readline from 'readline';
import { Db } from 'mongodb';
import axios from 'axios';
import database from '@shared/http/database';
import { Product } from 'app/Products/infra/mongoDb/models/Product';

import { ICronRepository } from '../../ICronRepostory';

class CronRepository implements ICronRepository {
  private collectionPromise: Promise<Db>;

  constructor() {
    this.collectionPromise = this.initCollection();
  }

  private async initCollection(): Promise<Db> {
    const client = await database.connect();
    const db = client.db();
    return db;
  }
  async updateDB(): Promise<void> {
    const db = await this.collectionPromise;

    const getNames = await axios.get(
      'https://challenges.coode.sh/food/data/json/index.txt'
    );
    const names = getNames.data.trim().split('\n');

    for await (const name of names) {
      const nameCollectio: any = `${name.split('.')[0]}.json`;

      console.log(nameCollectio);
      const collectionExists = await db
        .listCollections({ name: nameCollectio })
        .toArray();
      console.log(collectionExists);

      if (collectionExists.length) {
        console.log('Database is already updated', name);
        return;
      }

      const nameFile = name.replace('.json.gz', '.json');
      await this.downloadFileFromURL('products_01.json.gz');
      await this.extractGzipFile(name, nameFile);
      await this.insertToDB(nameFile);

      return;
    }
  }

  async downloadFileFromURL(filename: string): Promise<void> {
    const url = `https://challenges.coode.sh/food/data/json/${filename}`;
    try {
      const response = await axios.get(url, { responseType: 'stream' });
      const fileStream = fs.createWriteStream(`./src/shared/tmp/${filename}`);

      response.data.pipe(fileStream);

      await new Promise<void>((resolve, reject) => {
        fileStream.on('finish', () => {
          fileStream.close();
          console.log('download completed');
          resolve();
        });

        fileStream.on('error', (err) => {
          console.error('Error downloading file:', err);
          reject(err);
        });
      });
    } catch (error) {
      console.error('Error in the request:', error);
    }
  }
  async extractGzipFile(
    inputFilename: string,
    outputFilename: string
  ): Promise<void> {
    try {
      const readStream = fs.createReadStream(
        `./src/shared/tmp/${inputFilename}`
      );
      const writeStream = fs.createWriteStream(
        `./src/shared/tmp/${outputFilename}`
      );

      const unzip = zlib.createGunzip();
      readStream.pipe(unzip).pipe(writeStream);

      await new Promise<void>((resolve, reject) => {
        writeStream.on('finish', () => {
          writeStream.close();
          console.log('Completed extraction');
          resolve();
        });

        writeStream.on('error', (err) => {
          console.error('Error extracting file:', err);
          reject(err);
        });
      });
    } catch (error) {
      console.error('Error in extraction:', error);
    }
  }

  async insertToDB(name: string): Promise<void> {
    const db = await this.collectionPromise;
    const filePath = `./src/shared/tmp/${name}`;
    const fileProducts = [];

    const readStream = fs.createReadStream(filePath, { encoding: 'utf8' });
    const lineReader = readline.createInterface({ input: readStream });

    for await (const line of lineReader) {
      try {
        if (fileProducts.length >= 100) {
          break;
        }
        const objectData = JSON.parse(line);
        fileProducts.push(objectData);
      } catch (error) {
        console.error('Error processing line:', error);
      }
    }

    for (let i = 0; i < fileProducts.length; i++) {
      fileProducts[i].code = fileProducts[i].code.slice(1);
      const code = parseInt(fileProducts[i].code, 10);
      const data: Product = {
        code: String(code),
        status: ['published'],
        imported_t: new Date(),
        url: fileProducts[i].url,
        creator: fileProducts[i].creator,
        created_t: fileProducts[i].created_t,
        last_modified_t: fileProducts[i].last_modified_t,
        product_name: fileProducts[i].product_name,
        quantity: fileProducts[i].quantity,
        brands: fileProducts[i].brands,
        categories: fileProducts[i].categories,
        labels: fileProducts[i].labels,
        cities: fileProducts[i].cities,
        purchase_places: fileProducts[i].purchase_places,
        stores: fileProducts[i].stores,
        ingredients_text: fileProducts[i].ingredients_text,
        traces: fileProducts[i].traces,
        serving_size: fileProducts[i].serving_size,
        serving_quantity: fileProducts[i].serving_quantity,
        nutriscore_score: fileProducts[i].nutriscore_score,
        nutriscore_grade: fileProducts[i].nutriscore_grade,
        main_category: fileProducts[i].main_category,
        image_url: fileProducts[i].image_url,
      };

      await db.collection('products').insertOne(data);
      console.log('insert product in db');
    }
    await db.collection('fileName').insertOne({ name });
    console.log('insert file in db');
  }
}

export { CronRepository };
