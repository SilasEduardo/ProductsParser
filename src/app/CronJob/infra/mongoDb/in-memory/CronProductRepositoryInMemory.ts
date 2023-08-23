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
    this.downloadFileFromURL(file);
    this.extractGzipFile(file, file2);
    this.deleteFile(file);
    this.insertToDB(file);
    return true;
  }
  async downloadFileFromURL(filename: string): Promise<void> {
    const files = [
      'products_01.json.gz',
      'products_02.json.gz',
      'products_03.json.gz',
      'products_04.json.gz',
      'products_05.json.gz',
      'products_06.json.gz',
      'products_07.json.gz',
      'products_08.json.gz',
      'products_09.json.gz',
    ];

    const check = files.some((file) => file === filename);
    console.log(check);
  }

  async deleteFile(filename: string): Promise<boolean> {
    const files = [
      'products_01.json.gz',
      'products_02.json.gz',
      'products_03.json.gz',
      'products_04.json.gz',
      'products_05.json.gz',
      'products_06.json.gz',
      'products_07.json.gz',
      'products_08.json.gz',
      'products_09.json.gz',
    ];

    const check = files.some((file) => file === filename);
    return check;
  }

  async extractGzipFile(
    inputFilename: string,
    outputFilename: string
  ): Promise<void> {
    try {
      console.log(inputFilename, outputFilename);
    } catch (error) {
      console.error('Error in extraction:', error);
    }
  }

  async insertToDB(name: string): Promise<void> {
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
      console.log(name);
    }
  }
}

export { CronProductRepositoryInMemory };
