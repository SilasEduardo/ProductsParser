import axios from 'axios';

import { Product } from '../model/Product';
import { ICronProductRepository } from '../../ICronProductRepostory';

class CronProductRepositoryInMemory implements ICronProductRepository {
  bd: Product[] = [];
  constructor() {
    this.bd = [];
  }

  async updateDB(): Promise<boolean | undefined> {
    const file = 'products_01.json.gz';
    const file2 = 'products_01.json';
    const download = await this.downloadFileFromURL(file);
    const extract = await this.extractGzipFile(file, file2);
    const deleteFile = await this.deleteFile(file);
    await this.insertToDB(file);
    if (download && extract && deleteFile) return true;
    return false;
  }

  async nameFileExists(nameFile: string): Promise<boolean> {
    const getNames = await axios.get(
      'https://challenges.coode.sh/food/data/json/index.txt'
    );
    const names = getNames.data.trim().split('\n');
    return names.some((name: string) => name === nameFile);
  }

  async downloadFileFromURL(filename: string): Promise<boolean | undefined> {
    const check = this.nameFileExists(filename);
    return check;
  }

  async deleteFile(filename: string): Promise<boolean> {
    const check = this.nameFileExists(filename);
    return check;
  }

  async extractGzipFile(
    inputFilename: string,
    outputFilename: string
  ): Promise<boolean | undefined> {
    try {
      const check = this.nameFileExists(inputFilename);
      console.log(inputFilename, outputFilename);
      return check;
    } catch (error) {
      console.error('Error in extraction:', error);
    }
  }

  async insertToDB(filename: string): Promise<void> {
    const fileProducts = [
      {
        product: {
          code: '31',
          properties: {
            status: {
              bsonType: 'string',
              description: 'Deve ser um dos valores: draft, trash, published',
              enum: ['draft', 'trash', 'published'],
              default: 'draft',
            },
          },
        },
      },
      {
        product: {
          code: '32',
          properties: {
            status: {
              bsonType: 'string',
              description: 'Deve ser um dos valores: draft, trash, published',
              enum: ['draft', 'trash', 'published'],
              default: 'draft',
            },
          },
        },
      },
    ];

    for (let i = 0; i < fileProducts.length; i++) {
      fileProducts[i].product.code = fileProducts[i].product.code.slice(1);
      const code = parseInt(fileProducts[i].product.code, 10);
      const data: Product = {
        code: String(code),
        status: 'test',
        imported_t: new Date(),
        url: fileProducts[i].product.code,
        creator: fileProducts[i].product.code,
        created_t: 3,
        last_modified_t: 3,
        product_name: 'test',
        quantity: 'fileProducts[i].quantity',
        brands: 'fileProducts[i].brands',
        categories: ' fileProducts[i].categories',
        labels: 'fileProducts[i].labels',
        cities: 'fileProducts[i].cities',
        purchase_places: 'fileProducts[i].purchase_places',
        stores: 'fileProducts[i].stores',
        ingredients_text: 'fileProducts[i].ingredients_text',
        traces: 'fileProducts[i].traces',
        serving_size: 'fileProducts[i].serving_size',
        serving_quantity: 1,
        nutriscore_score: 1,
        nutriscore_grade: 'fileProducts[i].nutriscore_grade',
        main_category: 'fileProducts[i].main_category',
        image_url: 'fileProducts[i].image_url',
      };

      this.bd.push(data);
    }
  }

  async checkUserExists(code: string): Promise<Product | undefined> {
    const productExists = this.bd.find((product) => product.code === code);

    if (productExists) {
      return productExists;
    }
    console.log(`Product do not exists`);
    return productExists;
  }
}

export { CronProductRepositoryInMemory };
