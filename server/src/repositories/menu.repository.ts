import { Prisma, PrismaClient } from "@prisma/client"

export class MenuRepository {
  constructor(private prisma: PrismaClient) {}

  async createMenuItem(data: Prisma.MenuItemCreateInput) {
    return this.prisma.menuItem.create({
      data,
    })
  }

  async findByRestaurantId(restaurantId: string) {
    return this.prisma.menuItem.findMany({
      where: {
        restaurantId
      },
    })
  }
}