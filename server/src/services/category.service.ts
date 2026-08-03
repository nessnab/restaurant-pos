import { CategoryRepository } from "../repositories/category.repository";

export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {} 

  async createCategory(name: string, restaurantId: string) {
    const result = await this.categoryRepository.createCategory(
      name,
      restaurantId,
    )

    return result
  }
}