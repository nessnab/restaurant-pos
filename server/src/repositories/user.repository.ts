import type { Prisma, PrismaClient } from "@prisma/client";
import type { CreateUserInput } from "../types/user.types";

export class UserRepository {
  constructor(private prisma: Prisma.TransactionClient) {}
  async createUser(data: CreateUserInput) {
    return this.prisma.user.create({
      data,
    });
  }
}
export class UserEmailRepository {
  constructor(private prisma: PrismaClient) {}
  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email
      },
    });
  }
}