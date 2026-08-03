import { CategoryRepository } from "../repositories/category.repository";

export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {} 

  async getCategory(name: string, restaurantId: string) {
    const category = await this.categoryRepository.findByRestaurantId(restaurantId)

    return category.map(category => ({
      id: category.id,
      name: category.name,
    }))
  }

  async createCategory(name: string, restaurantId: string) {
    const result = await this.categoryRepository.createCategory(
      name,
      restaurantId,
    )

    return result
  }
}