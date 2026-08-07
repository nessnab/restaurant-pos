import prisma from "../prisma/client";
import { AppError } from "../utils/AppError";
import { RestaurantRepository } from "../repositories/restaurant.repository";
import type { UpdateRestaurantInput } from "../types/restaurant.types";

export class RestaurantService {
  constructor(private restaurantRepository: RestaurantRepository) {}

  async updateRestaurant(
    data: UpdateRestaurantInput,
    restaurantId: string
  ) {
    const restaurant = await this.restaurantRepository.findById(
      restaurantId,
    )
    return await this.restaurantRepository.updateRestaurant(
      data,
      restaurantId,
    )

  }
}