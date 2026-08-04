import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import { OrderService } from "../services/order.service";

export class OrderController{
  constructor(private orderService: OrderService) {}

  async createOrder(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        throw new AppError("Unauthenticated", 401)
      }
  
      const result = await this.orderService.createOrder(
        req.body,
        req.user.restaurantId,
        req.user.id
      )
      res.status(201).json(result)
    } catch (error) {
        next(error)
      }
  } 
}