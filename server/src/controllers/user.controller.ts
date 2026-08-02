import type { Request, Response, NextFunction } from "express"
import type { UserService } from "../services/user.service"
import { AppError } from "../utils/AppError"

export class UserController {
  constructor(private userService: UserService){}

  async registerCashier(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        throw new AppError("Unauthenticated", 401);
      }
      const result = await this.userService.register(
        req.body, 
        req.user.restaurantId
      )
      res.status(201).json(result)
    }
    catch (error) {
      next(error)
    }
  }
}