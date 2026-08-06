import { Prisma, PrismaClient } from "@prisma/client"
import type { UpdateMenuInput } from "../types/menu.types"

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
        restaurantId,
        isActive: true,
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

  async updateMenu(
    id: string, 
    restaurantId: string,
    data: UpdateMenuInput,
  ) {
      return this.prisma.menuItem.update({
        where: {
          id,
          restaurantId,
        },
        data: {
          ...(data.name !== undefined && {
            name: data.name,
          }),
          
          ...(data.description !== undefined && {
            description: data.description,
          }),

          ...(data.price !== undefined && {
            price: data.price,
          }),

          ...(data.isAvailable !== undefined && {
            isAvailable: data.isAvailable,
          }),

          ...(data.categoryId !== undefined && {
            category:
              data.categoryId === null
                ? {
                    disconnect: true,
                  }
                : {
                    connect: {
                      id: data.categoryId,
                    },
                  },
          }),
        }
      })
  }

    async deleteMenu(
      id: string,
    ) {
      return this.prisma.menuItem.update({
        where: {
          id,
          // restaurantId
        },
        data: {
          isActive: false
        }
      }
      )
    }
}