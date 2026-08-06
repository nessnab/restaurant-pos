import { MenuRepository } from "../repositories/menu.repository";
import { CategoryRepository } from "../repositories/category.repository";
import type { CreateMenuInput, UpdateMenuInput } from "../types/menu.types";
import { AppError } from "../utils/AppError";

export class MenuService {
  constructor(
    private menuRepository: MenuRepository,
    private categoryRepository: CategoryRepository
  ) {}

  async updateMenu(
    id: string, 
    data: UpdateMenuInput,
    restaurantId: string,
  ) {
    const menu = await this.menuRepository.findById(
      id,
      restaurantId
    )
    if (!menu) {
      throw new AppError("Menu not found", 404)
    }

    if (data.categoryId) {
      const category = await this.categoryRepository.findById(
        data.categoryId,
        restaurantId
      )

      if (!category) {
        throw new AppError("Category not found", 404)
      }
    }
    
    return await this.menuRepository.updateMenu(
      id,
      restaurantId,
      data,
    )
  }

  async getMenuItem(id: string, restaurantId: string) {
    const menu = await this.menuRepository.findById(
      id,
      restaurantId
    )
    if (!menu) {
      throw new AppError("Menu does not exist", 404)
    }

    return {
      id: menu.id,
      name: menu.name,
      description: menu.description,
      price: menu.price,
      isAvailable: menu.isAvailable,
      isActive: menu.isActive,
      displayOrder: menu.displayOrder,
      category: menu.category
        ? {
            id: menu.category.id,
            name: menu.category.name,
          }
        : null,
    }
  }

  async getAllMenu(restaurantId: string) {
    const menu = await this.menuRepository.findByRestaurantId(restaurantId)
    return menu
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