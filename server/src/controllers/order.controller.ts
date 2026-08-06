import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import { OrderService } from "../services/order.service";

type GetOrderParams = {
  id: string
}
export class OrderController{
  constructor(private orderService: OrderService) {}

  async getOrderById(
    req: Request<GetOrderParams>, res: Response, next: NextFunction
  ) {
    try {
      if (!req.user) {
        throw new AppError("Unauthenticated", 401)
      }
      const result = await this.orderService.getOrderId(
        req.params.id,
        req.user.restaurantId
      )
      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }

  async getAllOrderByRestaurantId(
    req: Request, res: Response, next: NextFunction
  ) {
    try {
      if (!req.user) {
        throw new AppError("Unauthenticated", 401)
      }
      const page = Number(req.query.page) || 1
      const limit = Number(req.query.limit) || 20
      const result = await this.orderService.getOrders(
        req.user.restaurantId,
        page,
        limit,
      )
      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }

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