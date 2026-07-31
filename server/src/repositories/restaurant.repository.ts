import prisma from "../prisma/client"

export class RestaurantRepository {
  async createRestaurant(name: string, slug:string) {
    return prisma.restaurant.create({
      data: {
        name,
        slug,
      }
    })

  }
}