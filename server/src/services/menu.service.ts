import { MenuRepository } from "../repositories/menu.repository";
import { CategoryRepository } from "../repositories/category.repository";
import type { CreateMenuInput } from "../types/menu.types";
import { AppError } from "../utils/AppError";

export class MenuService {
  constructor(
    private menuRepository: MenuRepository,
    private categoryRepository: CategoryRepository
  ) {}

  async getMenu(data: CreateMenuInput, restaurantId: string) {
    const menu = await this.menuRepository.findByRestaurantId(restaurantId)
    return menu.map(() => ({
      data
    }))
  }

  async createMenuItem(data: CreateMenuInput, restaurantId: string) {
    const { name, description, price, categoryId } = data

    // check category
    if (categoryId) {
      const categoryExist =
        await this.categoryRepository.findById(
          categoryId,
          restaurantId
        )

      if (!categoryExist) {
        throw new AppError("Category does not exist", 404)
      }
    }

    const result = await this.menuRepository.createMenuItem({
      name,
      description: description ?? null,
      price,
      restaurant: {
        connect: {
          id: restaurantId,
        },
      },
      ... (categoryId && {
        category: {
          connect: {
            id: categoryId,
          },
        }
      })
    })

    return result
  }
}