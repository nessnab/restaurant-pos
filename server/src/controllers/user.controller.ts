import type { Request, Response, NextFunction } from "express"
import type { UserService } from "../services/user.service"
import { AppError } from "../utils/AppError"

export class UserController {
  constructor(private userService: UserService){}

  async getUserById(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      if (!req.user) {
        throw new AppError("Unauthenticated", 401)
      }
      const result = await this.userService.getUserById(
        req.params.id,
        req.user.restaurantId,
      )
      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }

  async getUsersByRestaurantId(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        throw new AppError("Unauthenticated", 401);
      }
      const result = await this.userService.getUsersByRestaurantId(req.user.restaurantId)
      res.status(200).json(result)
    }
    catch (error) {
      next(error)
    }
  }

  async loginCashier(req: Request, res: Response, next: NextFunction) {
    try {
      const { restaurantSlug, username, password } = req.body

      const result = await this.userService.loginCashier(
        restaurantSlug,
        username, 
        password,
      )
      res.status(200).json(result)
    }
    catch (error) {
      next(error)
    }
  }

  async registerCashier(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        throw new AppError("Unauthenticated", 401);
      }
      const result = await this.userService.registerCashier(
        req.body, 
        req.user.restaurantId,
      )
      res.status(201).json(result)
    }
    catch (error) {
      next(error)
    }
  }
}