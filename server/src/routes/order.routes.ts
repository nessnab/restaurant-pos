import prisma from "../prisma/client"
import { Router } from "express";

import { MenuRepository } from "../repositories/menu.repository";
import { OrderRepository } from "../repositories/order.repository";
import { OrderService } from "../services/order.service";
import { OrderController } from "../controllers/order.controller";

import { AuthMiddleware } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate";
import { createOrderSchema } from "../validators/order.validator"

const router = Router()
const authMiddleware = new AuthMiddleware()
const menuRepository = new MenuRepository(prisma)
const orderRepository = new OrderRepository(prisma)
const orderService = new OrderService(orderRepository, menuRepository)
const orderController = new OrderController(orderService)

router.post(
  "/order",
  validate(createOrderSchema),
  orderController.createOrder.bind(orderController),
)

router.get(
  "/orders",
  authMiddleware.authenticate.bind(authMiddleware),
  orderController.getAllOrderByRestaurantId.bind(orderController)
)

export default router
