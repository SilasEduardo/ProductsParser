import { v4 as uuidv4 } from 'uuid';

import { ICreateProductDTO } from '../../../dtos/ICreateProductDTO';
import { IProductRepository } from '../../IProductRepository';

class CategoryRepositoryInMemory implements IProductRepository {
  categories: Category[] = [];

  async findById(id: string): Promise<Category | undefined> {
    return this.categories.find((item) => item.id === id);
  }

  async list(): Promise<Category[]> {
    return this.categories;
  }

  async findByName(name: string): Promise<Category | undefined> {
    return this.categories.find((item) => item.name === name);
  }

  async create(data: ICreateProductDTO): Promise<void> {
    const category = new Category();
    Object.assign(category, {
      description: data.description,
      name: data.name,
      id,
    });
    this.categories.push(category);
  }
}

export { CategoryRepositoryInMemory };
