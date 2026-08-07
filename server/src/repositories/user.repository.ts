import type { Prisma, PrismaClient } from "@prisma/client";
import type { CreateUserInput } from "../types/user.types";

export class UserOwnerRepository {
  constructor(private prisma: Prisma.TransactionClient) {}
  async createUser(data: CreateUserInput) {
    return this.prisma.user.create({
      data,
    });
  }
}
export class UserRepository {
  constructor(private prisma: PrismaClient) {}
  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email
      },
    });
  }
  async findByUsername(username: string, restaurantId: string) {
    return this.prisma.user.findUnique({
      where: {
        restaurantId_username: {
          restaurantId,
          username
        }
      },
      include: {
        restaurant: true
      }
    });
  }
  async findByRestaurantId(restaurantId: string) {
    return this.prisma.user.findMany({
      where: {
        restaurantId,
        isActive: true,
      },
    });
  }

  async findById(
    id: string, 
    restaurantId: string
  ) {
    return this.prisma.user.findFirst({
      where: {
        id,
        restaurantId,
      }, 
    })
  }

  async updateUser(
    id: string,
    restaurantId: string,
    data: CreateUserInput) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        ...(data.name !== undefined && {
            name: data.name,
          }),

        ...(data.email !== undefined && {
            email: data.email,
          }),
        
        ...(data.username !== undefined && {
            username: data.username,
          }),
      }
    })
  }

  async deleteUser(
    id: string,
  ) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        isActive: false
      }
    })
  }
}

