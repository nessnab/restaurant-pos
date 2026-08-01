import prisma from "../prisma/client"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { AppError } from "../utils/AppError" 
import { slugify } from "../utils/slugify"

import { UserRepository, UserEmailRepository } from "../repositories/user.repository"
import { RestaurantRepository } from "../repositories/restaurant.repository"
import type { RegisterInput } from "../types/auth.types"

export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private restaurantRepository: RestaurantRepository,
    private userEmailRepository: UserEmailRepository
  ) {}
  async login(email: string, password: string) {
    const user = await this.userEmailRepository.findByEmail(email)
    if (!user || !user.isActive) {
      throw new AppError("Invalid email or password", 401)
    }
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash)
    if (!isPasswordValid) {
      throw new AppError("Invalid email or password", 401)
    }

    const token = jwt.sign(
      {
        userId: user.id,
        restaurantId: user.restaurantId,
        role: user.role,
      },
      process.env.JWT_SECRET || "secret",
      {
        expiresIn: "1d",
      }
    );

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    }
  }

  async register(data: RegisterInput) {    
    const { restaurantName, ownerName, email, password } = data
    
    const existingUser = await this.userEmailRepository.findByEmail(data.email)
    if (existingUser) {
      throw new AppError("Email already exist", 409)
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const slug = slugify(restaurantName)

    const result = await prisma.$transaction(async (tx) => {
      const restaurantRepository = new RestaurantRepository(tx)
      const userRepository = new UserRepository(tx)

      const restaurant = await restaurantRepository.createRestaurant(
        restaurantName,
        slug,
      )

      const user = await userRepository.createUser({
        restaurantId: restaurant.id,
        name: ownerName,
        email,
        passwordHash,
        role: "OWNER"
        }
      )
      return({ restaurant, user })
    })

    const token = jwt.sign(
      {
        userId: result.user.id,
        restaurantId: result.user.restaurantId,
        role: result.user.role,
      },
      process.env.JWT_SECRET || "secret",
      {
        expiresIn: "1d",
      }
    );

    return {
      token,
      restaurant: result.restaurant,
      user: {
        id: result.user.id,
        name: result.user.name,
        email: result.user.email,
        role: result.user.role,
      }
    }
  }
}