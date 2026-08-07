import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { AppError } from "../utils/AppError" 

import { UserRepository, UserOwnerRepository } from "../repositories/user.repository"
import type { RestaurantRepository } from "../repositories/restaurant.repository"
import type { CashierRegisterInput } from "../types/auth.types"
import type { CreateUserInput } from "../types/user.types"

export class UserService {
  constructor(
    private restaurantRepository: RestaurantRepository,
    private userOwnerRepository: UserOwnerRepository,
    private userRepository: UserRepository,
  ) {}

  async updateUser(
    id: string, 
    restaurantId: string,
    data: CreateUserInput) {
    const user = await this.userRepository.findById(
      id,
      restaurantId
    )
    if (!user) {
      throw new AppError("User not found", 404)
    }
    return await this.userRepository.updateUser(
      id,
      restaurantId,
      data,
    )
  }

  async getUserById(
    id: string,
    restaurantId: string
  ) {
    const user = await this.userRepository.findById(
      id,
      restaurantId
    )
    console.log("user", user)
    if (!user) {
      throw new AppError("User not found", 404)
    }
    return user
  }

  async getUsersByRestaurantId(restaurantId: string) {
    const users = await this.userRepository.findByRestaurantId(restaurantId)
    return users.map(user => ({
      id: user.id,
      name: user.name,
      username: user.username,
      role: user.role,
      isActive: user.isActive,
    }))
  }

  async loginCashier(
    restaurantSlug: string,
    username: string, 
    password: string, 
  ) {

    // check if restaurant exists
    const restaurant = await this.restaurantRepository.findBySlug(restaurantSlug)
    if (!restaurant) {
      throw new AppError("Invalid restaurant", 401)
    }

    // check if user exists
    const user = await this.userRepository.findByUsername(username, restaurant.id)
    if (!user || !user.isActive) {
      throw new AppError("Invalid username", 401)
    }

    // check if password is correct
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash)
    if (!isPasswordValid) {
      throw new AppError("Invalid password", 401)
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
        restaurantId: user.restaurantId,
        name: user.name,
        username: user.username,
        role: user.role,
      }
    }
  }
  
  async registerCashier(data: CashierRegisterInput, restaurantId: string) {
    const { name, username, email, password } = data

    // check username
    const usernameExists = await this.userRepository.findByUsername(username, restaurantId)
    if (usernameExists) {
      throw new AppError("Username already exists", 409)
    }
    
    // check email if existed
    if (email) {
      const existingUser = await this.userRepository.findByEmail(email)
      if (existingUser) {
        throw new AppError("Email already exists", 409)
      } 
    }
    const passwordHash = await bcrypt.hash(password, 10)

    const cashier = await this.userOwnerRepository.createUser({
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