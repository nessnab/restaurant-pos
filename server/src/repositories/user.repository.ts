import prisma from "../prisma/client"
import type { CreateUserInput } from "../types/user.types";

export class UserRepository {
  async createUser(data: CreateUserInput) {
    return prisma.user.create({
      data,
    })
  }
}