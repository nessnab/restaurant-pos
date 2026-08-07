import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import { RestaurantService } from "../services/restaurant.service";

export class RestaurantController {
  constructor(private restaurantService: RestaurantService) {} 

  async updateRestaurant(
    req: Request, res: Response, next: NextFunction
  ) {
    try {
      if (!req.user) {
        throw new AppError("Unauthenticated how", 401)
      }
      const result = await this.restaurantService.updateRestaurant(
        req.body,
        req.user.restaurantId
      )
      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }
}