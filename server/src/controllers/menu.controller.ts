import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import { MenuService } from "../services/menu.service";

export class MenuController {
  constructor(private menuService: MenuService) {} 

  async getMenuItem(req: Request, res: Response, next: NextFunction) {
    try {
      if(!req.user) {
        throw new AppError("Unauthenticated", 401)
      }
      const { id } = req.params

      if (!id || Array.isArray(id)) {
        throw new AppError("Invalid menu item ID", 400)
      }
      const result = await this.menuService.getMenuItem(
        id,
        req.user.restaurantId
      )
      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }

  async getMenuByRestaurantId(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        throw new AppError("Unauthenticated", 401)
      }
      const result = await this.menuService.getAllMenu(
        req.body,
        req.user.restaurantId
      )
      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }

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