import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { AuthService } from "../services/auth.service";
import { UserEmail, UserRepository } from "../repositories/user.repository";
import { RestaurantRepository } from "../repositories/restaurant.repository";
import prisma from "../prisma/client";
import { validate } from "../middleware/validate";
import { registerSchema } from "../validators/auth.validator";

const router = Router();

const userRepository = new UserRepository(prisma);
const restaurantRepository = new RestaurantRepository(prisma);
const userEmail = new UserEmail(prisma);

const authService = new AuthService(
  userRepository, 
  restaurantRepository,
  userEmail
);

const authController = new AuthController(authService);

router.post(
  "/register",
  validate(registerSchema),
  authController.register.bind(authController)
);

export default router;