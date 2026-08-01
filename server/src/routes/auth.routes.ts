import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { AuthService } from "../services/auth.service";
import { UserEmailRepository, UserRepository } from "../repositories/user.repository";
import { RestaurantRepository } from "../repositories/restaurant.repository";
import prisma from "../prisma/client";
import { validate } from "../middleware/validate";
import { registerSchema, loginSchema } from "../validators/auth.validator";

const router = Router();

const userRepository = new UserRepository(prisma);
const restaurantRepository = new RestaurantRepository(prisma);
const userEmailRepository = new UserEmailRepository(prisma);

const authService = new AuthService(
  userRepository, 
  restaurantRepository,
  userEmailRepository
);

const authController = new AuthController(authService);

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

export default router;