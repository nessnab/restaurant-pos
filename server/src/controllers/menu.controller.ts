import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import { MenuService } from "../services/menu.service";

export class MenuController {
  constructor(private menuService: MenuService) {} 

  async createMenuItem(req: Request, res: Response, next: NextFunction) {
    try {
      if(!req.user) {
        throw new AppError("Unauthenticated", 401);
      }
      const result = await this.menuService.createMenuItem(
        req.body,
        req.user.restaurantId
      )
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }
}