import prisma from "../prisma/client"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { AppError } from "../utils/AppError" 
import { slugify } from "../utils/slugify"

import { UserRepository, UserOwnerRepository } from "../repositories/user.repository"
import { RestaurantRepository } from "../repositories/restaurant.repository"
import type { RegisterInput } from "../types/auth.types"

export class AuthService {
  constructor(
    private userOwnerRepository: UserOwnerRepository,
    private restaurantRepository: RestaurantRepository,
    private userRepository: UserRepository,
  ) {}
  async login(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email)
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
    
    const existingUser = await this.userRepository.findByEmail(data.email)
    if (existingUser) {
      throw new AppError("Email already exist", 409)
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const slug = slugify(restaurantName)

    const result = await prisma.$transaction(async (tx) => {
      const restaurantRepository = new RestaurantRepository(tx)
      const userOwnerRepository = new UserOwnerRepository(tx)

      const restaurant = await restaurantRepository.createRestaurant(
        restaurantName,
        slug,
      )

      const user = await userOwnerRepository.createUser({
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