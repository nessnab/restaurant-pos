import prisma from "../prisma/client";
import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { UserService } from "../services/user.service";

import { UserRepository, UserEmailRepository } from "../repositories/user.repository";

import { AuthMiddleware } from "../middleware/auth.middleware";
import { authorize } from "../middleware/authorize.middleware";
import { validate } from "../middleware/validate";
import { cashierRegisterSchema } from "../validators/auth.validator";

const router = Router();
const userRepository = new UserRepository(prisma);
const userEmailRepository = new UserEmailRepository(prisma);

const userService = new UserService(
  userRepository,
  userEmailRepository
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

export default router;