import { CategoryRepository } from "../repositories/category.repository";
import { AppError } from "../utils/AppError";
import type { UpdateCategoryInput } from "../types/menu.types";

export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {} 

  async updateCategory(
      id: string, 
      restaurantId: string,
      data: UpdateCategoryInput,
    ) {
      const category = await this.categoryRepository.findById(
        id,
        restaurantId
      )
      if (!category) {
        throw new AppError("Category not found", 404)
      }
      
      return await this.categoryRepository.updateCategory(
        id,
        data,
      )
  }

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