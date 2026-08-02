import prisma from "../prisma/client"
import bcrypt from "bcrypt"
import { AppError } from "../utils/AppError" 

import { UserRepository, UserEmailRepository } from "../repositories/user.repository"
import type { CashierRegisterInput } from "../types/auth.types"

export class UserService {
  constructor(
    private userRepository: UserRepository,
    private userEmailRepository: UserEmailRepository
  ) {}
  
  async register(data: CashierRegisterInput, restaurantId: string) {
    const { name, username, email, password } = data

    // check username
    const usernameExists = await this.userEmailRepository.findByUsername(username, restaurantId)
    if (usernameExists) {
      throw new AppError("Username already exists", 409)
    }
    
    // check email if existed
    if (email) {
      const existingUser = await this.userEmailRepository.findByEmail(email)
      if (existingUser) {
        throw new AppError("Email already exists", 409)
      } 
    }
    const passwordHash = await bcrypt.hash(password, 10)

    const cashier = await this.userRepository.createUser({
        restaurantId: restaurantId,
        name: name,
        username: username,
        ...(email && { email }),
        passwordHash,
        role: "CASHIER"
        }
      )
        
    return {
      id: cashier.id,
      restaurantId: cashier.restaurantId,
      name: cashier.name,
      username: cashier.username,
      email: cashier.email,
      role: cashier.role,
      isActive: cashier.isActive,
    };
  }
}