import prisma from "../prisma/client";
import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { UserService } from "../services/user.service";

import { UserOwnerRepository, UserRepository } from "../repositories/user.repository";

import { AuthMiddleware } from "../middleware/auth.middleware";
import { authorize } from "../middleware/authorize.middleware";
import { validate } from "../middleware/validate";
import { 
  cashierRegisterSchema, 
  cashierLoginSchema,
  updateUserSchema
} from "../validators/auth.validator";
import { RestaurantRepository } from "../repositories/restaurant.repository";

const router = Router();
const restaurantRepository = new RestaurantRepository(prisma);
const userOwnerRepository = new UserOwnerRepository(prisma);
const userRepository = new UserRepository(prisma);

const userService = new UserService(
  restaurantRepository,
  userOwnerRepository,
  userRepository,
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

router.get(
  "/users",
  authMiddleware.authenticate.bind(authMiddleware),
  authorize("OWNER"),
  userController.getUsersByRestaurantId.bind(userController)
);

router.get(
  "/user/:id",
  authMiddleware.authenticate.bind(authMiddleware),
  authorize("OWNER"),
  userController.getUserById.bind(userController)
);

router.patch(
  "/user/:id",
  validate(updateUserSchema),
  authMiddleware.authenticate.bind(authMiddleware),
  authorize("OWNER"),
  userController.updateUser.bind(userController)
);

export default router;