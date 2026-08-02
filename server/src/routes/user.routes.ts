import prisma from "../prisma/client";
import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { UserService } from "../services/user.service";

import { UserRepository, UserEmailRepository } from "../repositories/user.repository";

import { AuthMiddleware } from "../middleware/auth.middleware";
import { authorize } from "../middleware/authorize.middleware";
import { validate } from "../middleware/validate";
import { cashierRegisterSchema, cashierLoginSchema } from "../validators/auth.validator";
import { RestaurantRepository } from "../repositories/restaurant.repository";

const router = Router();
const restaurantRepository = new RestaurantRepository(prisma);
const userRepository = new UserRepository(prisma);
const userEmailRepository = new UserEmailRepository(prisma);

const userService = new UserService(
  restaurantRepository,
  userRepository,
  userEmailRepository,
);
const authMiddleware = new AuthMiddleware();
const userController = new UserController(userService);

router.post(
  "/users",
  authMiddleware.authenticate.bind(authMiddleware),
  authorize("OWNER"),
  validate(cashierRegisterSchema),
  userController.registerCashier.bind(userController)
);

router.post(
  "/users/login",
  validate(cashierLoginSchema),
  userController.loginCashier.bind(userController)
);

export default router;