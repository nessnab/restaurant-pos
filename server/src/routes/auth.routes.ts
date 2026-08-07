import prisma from "../prisma/client";
import { Router } from "express";

import { AuthController } from "../controllers/auth.controller";
import { AuthService } from "../services/auth.service";
import { AuthMiddleware } from "../middleware/auth.middleware";

import { UserRepository, UserOwnerRepository } from "../repositories/user.repository";
import { RestaurantRepository } from "../repositories/restaurant.repository";

import { validate } from "../middleware/validate";
import { registerSchema, loginSchema } from "../validators/auth.validator";

const router = Router();

const userOwnerRepository = new UserOwnerRepository(prisma);
const restaurantRepository = new RestaurantRepository(prisma);
const userRepository = new UserRepository(prisma);

const authService = new AuthService(
  userOwnerRepository, 
  restaurantRepository,
  userRepository
);

const authController = new AuthController(authService);
const authMiddleware = new AuthMiddleware();

router.post(
  "/register",
  validate(registerSchema),
  authController.register.bind(authController)
);

router.post(
  "/login",
  validate(loginSchema),
  authController.login.bind(authController)
);

router.get(
  "/me",
  authMiddleware.authenticate.bind(authMiddleware),
  authController.me.bind(authController)
);

router.get(
  "/restaurant",
  authMiddleware.authenticate.bind(authMiddleware),
  authController.restaurant.bind(authController)
);

export default router;