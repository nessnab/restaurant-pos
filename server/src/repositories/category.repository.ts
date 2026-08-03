import { PrismaClient } from "@prisma/client"

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
}