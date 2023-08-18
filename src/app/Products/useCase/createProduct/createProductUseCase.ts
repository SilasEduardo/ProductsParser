import { inject, injectable } from 'tsyringe';

import { ICreateProductDTO } from '../../dtos/ICreateProductDTO';
import { IProductRepository } from '../../infra/IProductRepository';

@injectable()
class CreateProductUseCase {
  constructor(
    @inject('PoductRepository')
    private poductRepository: IProductRepository
  ) {}

  async execute({
    product_name,
    status,
    url,
    creator,
    created_t,
    last_modified_t,
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
  }: ICreateProductDTO): Promise<void> {
    await this.poductRepository.create({
      status,
      url,
      creator,
      created_t,
      last_modified_t,
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
      product_name,
    });
  }
}

export { CreateProductUseCase };
