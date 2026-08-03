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
}

