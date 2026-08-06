import { PrismaClient } from "@prisma/client"
import type { UpdateCategoryInput } from "../types/menu.types"

export class CategoryRepository {
  constructor(private prisma: PrismaClient) {}

  async createCategory(name: string, restaurantId: string) {
    return this.prisma.category.create({
      data: {
        name,
        restaurantId
      },
    })
  }

  async findByRestaurantId(restaurantId: string) {
    return this.prisma.category.findMany({
      where: {
        restaurantId,
      },
    })
  }

  async findById(id: string, restaurantId: string) {
    return this.prisma.category.findFirst({
      where: {
        id,
        restaurantId,
      },
    })
  }

  async updateCategory(
    id: string,
    data: UpdateCategoryInput,
  ) {
    return this.prisma.category.update({
      where: {
        id,
      }, 
      data: {
        ...(data.name !== undefined && {
          name: data.name,
        }),
      }
    })
  }

  async deleteCategory(
    id: string,
  ) {
    return this.prisma.category.update({
      where: {
        id,
      }, 
      data: {
        isActive: false
      }
    })
  }

}