import type { Prisma } from "@prisma/client";

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
}