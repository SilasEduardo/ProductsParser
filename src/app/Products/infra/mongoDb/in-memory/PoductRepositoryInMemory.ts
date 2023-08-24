import { IGetProductDTO } from '@app/Products/dtos/IGetProductDTO';
import { IProductRepository } from '../../IProductRepository';
import { Product } from '../models/Product';

class ProductRepositoryInmemory implements IProductRepository {
  bd: Product[] = [];

  constructor() {
    this.bd = [
      {
        code: '17',
        status: [],
        imported_t: new Date(),
        url: 'https://chat.openai.com/',
        creator: 'string',
        created_t: 32,
        last_modified_t: 14,
        product_name: 'string',
        quantity: ' string',
        brands: ' string',
        categories: ' string',
        labels: ' string',
        cities: ' string',
        purchase_places: ' string',
        stores: ' string',
        ingredients_text: ' string',
        traces: ' string',
        serving_size: ' string',
        serving_quantity: 18,
        nutriscore_score: 32,
        nutriscore_grade: ' string',
        main_category: ' string',
        image_url: ' string',
      },

      {
        code: '18',
        status: [],
        imported_t: new Date(),
        url: 'https://chat.openai.com/',
        creator: 'string',
        created_t: 32,
        last_modified_t: 14,
        product_name: 'string',
        quantity: ' string',
        brands: ' string',
        categories: ' string',
        labels: ' string',
        cities: ' string',
        purchase_places: ' string',
        stores: ' string',
        ingredients_text: ' string',
        traces: ' string',
        serving_size: ' string',
        serving_quantity: 18,
        nutriscore_score: 32,
        nutriscore_grade: ' string',
        main_category: ' string',
        image_url: ' string',
      },

      {
        code: '19',
        status: [],
        imported_t: new Date(),
        url: 'https://chat.openai.com/',
        creator: 'string',
        created_t: 32,
        last_modified_t: 14,
        product_name: 'string',
        quantity: ' string',
        brands: ' string',
        categories: ' string',
        labels: ' string',
        cities: ' string',
        purchase_places: ' string',
        stores: ' string',
        ingredients_text: ' string',
        traces: ' string',
        serving_size: ' string',
        serving_quantity: 18,
        nutriscore_score: 32,
        nutriscore_grade: ' string',
        main_category: ' string',
        image_url: ' string',
      },
    ];
  }

  async statusApi(): Promise<IGetProductDTO> {
    const hour: any = '30/21/10';
    const dataStatus = {
      lastCronTime: hour,
      runtime: 'string',
      memoryInUse: {
        rss: 'string',
        heapTotal: 'string',
        heapUsed: 'string',
        external: 'string',
        arrayBuffers: 'string',
      },
    };

    return dataStatus;
  }
  getProduct(code: ' string'): Promise<any | undefined> {
    const findProduct: any = this.bd.find((product) => product.code === code);

    if (findProduct) {
      return findProduct;
    }

    return findProduct;
  }
  async listProducts(): Promise<any[] | undefined> {
    if (this.bd) {
      return this.bd;
    }

    return this.bd;
  }

  async deleteProduct(code: ' string'): Promise<boolean | undefined> {
    const productExists = this.bd.find((product) => product.code === code);

    if (productExists) {
      productExists.status.push('trash');
      return true;
    }
    return false;
  }

  async updateProduct(code: ' string', data: any): Promise<any> {
    const { product_name, quantity } = data;

    const productExists = this.bd.find((product) => product.code === code);

    if (productExists) {
      const product = Object.assign(productExists, {
        product_name,
        quantity,
      });

      return product;
    }
    return productExists;
  }
}

export { ProductRepositoryInmemory };
