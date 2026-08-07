import type { Prisma } from "@prisma/client";
import type { UpdateRestaurantInput } from "../types/restaurant.types";

export class RestaurantRepository {
  constructor(private prisma: Prisma.TransactionClient) {}

  async createRestaurant(name: string, slug: string) {
    return this.prisma.restaurant.create({
      data: {
        name,
        slug,
      },
    });
  }

  async findBySlug(slug: string) {
    return this.prisma.restaurant.findUnique({
      where: {
        slug,
      },
    });
  }

  async findById(restaurantId: string) {
    return this.prisma.restaurant.findFirst({
      where: {
        id: restaurantId
      }
    })
  }

  async updateRestaurant(data: UpdateRestaurantInput, restaurantId: string) {
    return this.prisma.restaurant.update({
      where: {
        id: restaurantId
      },
      data: {
        ...(data.name !== undefined && {
            name: data.name,
        }),
        ...(data.address !== undefined && {
            address: data.address,
        }),
        ...(data.name !== undefined && {
            phone: data.phone,
        }),
      }
    })
  }
}