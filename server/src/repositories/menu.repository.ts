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

  async findById(id: string, restaurantId: string) {
    return this.prisma.menuItem.findFirst({
      where: {
        id,
        restaurantId
      },
      include: {
        category: true
      }
    })
  }

  async findByIds(ids: string[], restaurantId: string) {
    return this.prisma.menuItem.findMany({
      where: {
        id: {
          in: ids,
        },
        restaurantId,
        isActive: true,
        isAvailable: true,
      },
    })
  }
}