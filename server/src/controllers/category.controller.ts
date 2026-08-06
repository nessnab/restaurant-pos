import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import { CategoryService } from "../services/category.service";

export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  async updateCategory(
    req: Request<{ id: string}>, res: Response, next: NextFunction
  ) {
    try {
      if (!req.user) {
        throw new AppError("Unauthenticated", 401)
      }
      const result = await this.categoryService.updateCategory(
        req.params.id,
        req.user.restaurantId,
        req.body,
      )
      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }

  async getCategoryByRestaurantId(
    req: Request, res: Response, next: NextFunction
  ) {
    try {
      if (!req.user) {
        throw new AppError("Unauthenticated", 401);
      }
      const result = await this.categoryService.getCategory(
        req.body.name,
        req.user.restaurantId
      )
      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }

  async createCategory(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        throw new AppError("Unauthenticated", 401)
      }
      const result = await this.categoryService.createCategory(
        req.body.name,
        req.user.restaurantId
      )
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }
}