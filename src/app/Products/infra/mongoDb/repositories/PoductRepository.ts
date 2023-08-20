import { Db } from 'mongodb';

import database from '@shared/http/database';

import { ICreateProductDTO } from '../../../dtos/ICreateProductDTO';
import { IProductRepository } from '../../IProductRepository';
import { Product } from '../models/Product';

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

  async create({
    brands,
    categories,
    cities,
    created_t,
    creator,
    image_url,
    last_modified_t,
    ingredients_text,
    labels,
    main_category,
    nutriscore_grade,
    nutriscore_score,
    product_name,
    purchase_places,
    quantity,
    serving_quantity,
    serving_size,
    status,
    stores,
    traces,
    url,
  }: ICreateProductDTO): Promise<void> {
    const db = await this.collectionPromise;

    const product = new Product();

    const newProduct = Object.assign(product, {
      status,
      imported_t: new Date(),
      url,
      creator,
      created_t,
      last_modified_t,
      product_name,
      quantity,
      brands,
      categories,
      labels,
      cities,
      purchase_places,
      stores,
      ingredients_text,
      traces,
      serving_size,
      serving_quantity,
      nutriscore_score,
      nutriscore_grade,
      main_category,
      image_url,
    });

    await db.collection('product').insertOne(newProduct);
  }
}

export { PoductRepository };
