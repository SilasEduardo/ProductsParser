import * as fs from 'fs';
import * as readline from 'readline';
import { format } from 'date-fns';
import { Db } from 'mongodb';
import axios from 'axios';
import { Product } from '@app/CronJob/infra/mongoDb/model/Product';
import database from '@shared/database';
import { downloadFile, extractFile, status } from '@utils/fileImports';
import { ICronProductRepository } from '../../ICronProductRepostory';

class CronProductRepository implements ICronProductRepository {
  private collectionPromise: Promise<Db>;

  constructor() {
    this.collectionPromise = this.initCollection();
  }

  private async initCollection(): Promise<Db> {
    const client = await database.connect();
    const db = client.db();
    return db;
  }

  async nameFileExists(nameFile: string): Promise<boolean> {
    const getNames = await axios.get(
      'https://challenges.coode.sh/food/data/json/index.txt'
    );
    const names = getNames.data.trim().split('\n');
    const check = names.find((name: string) => name === nameFile);

    return check;
  }

  async downloadFileFromURL(filename: string): Promise<boolean | undefined> {
    const url = `https://challenges.coode.sh/food/data/json/${filename}`;
    const check = this.nameFileExists(filename);
    try {
      const response = await axios.get(url, { responseType: 'stream' });
      const fileStream = fs.createWriteStream(`./tmp/${filename}`);

      await downloadFile(fileStream, response);
      return check;
    } catch (error) {
      console.error('Error in the request:', error);
    }
  }

  async deleteFile(nameJson: string): Promise<boolean> {
    const check = this.nameFileExists(nameJson);
    try {
      fs.unlinkSync(`./tmp/${nameJson}`);
      console.log('File deleted successfully.');
      return check;
    } catch (err) {
      console.error('An error occurred while deleting the file:', err);
      return false;
    }
  }

  async extractGzipFile(
    inputFilename: string,
    outputFilename: string
  ): Promise<boolean | undefined> {
    try {
      const check = this.nameFileExists(inputFilename);
      const readStream = fs.createReadStream(`./tmp/${inputFilename}`);
      const writeStream = fs.createWriteStream(`./tmp/${outputFilename}`);
      await extractFile(readStream, writeStream);
      return check;
    } catch (error) {
      console.error('Error in extraction:', error);
    }
  }

  async insertToDB(name: string): Promise<void> {
    const db = await this.collectionPromise;
    const filePath = `./tmp/${name}`;
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
        status: status('published'),
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

      await db.collection(name).insertOne(data);
      console.log('insert product in db');
    }
    const now = new Date();
    const formattedDate = format(now, 'dd/MM/yyyy');
    const formattedTime = format(now, 'HH:mm:ss');

    const importedDate = {
      date: formattedDate,
      hour: formattedTime,
    };
    await db
      .collection('import_history')
      .insertOne({ name, import_date: importedDate });
    console.log('insert file in db');
    this.deleteFile(`${name}`);
    this.deleteFile(`${name}.gz`);
    console.log('DONE');
  }

  async updateDB(): Promise<boolean | undefined> {
    const db = await this.collectionPromise;

    const getNames = await axios.get(
      'https://challenges.coode.sh/food/data/json/index.txt'
    );
    const names = getNames.data.trim().split('\n');
    const collections = await db.listCollections({}).toArray();

    if (collections.length > 9) {
      console.log('all files are already created');
      return;
    }

    for (const name of names) {
      let number = 1;
      if (collections.length > 0) {
        number = Math.max(
          ...collections
            .map((doc) => parseInt(doc.name[10], 10))
            .filter((number) => number)
        );
        number++;
      }

      const fileName = `products_0${number}.json.gz`;

      const nameFile = fileName.replace('.json.gz', '.json');
      await this.downloadFileFromURL(fileName);
      await this.extractGzipFile(fileName, nameFile);
      await this.insertToDB(nameFile);
      console.log(`${name} was created in the database `);
      return;
    }
  }
}

export { CronProductRepository };
