import prisma from "../prisma/client"
import bcrypt from "bcrypt"
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

    return {
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