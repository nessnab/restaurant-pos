import prisma from "../prisma/client";
import { Router } from "express";

import { RestaurantRepository } from "../repositories/restaurant.repository";
import { RestaurantService } from "../services/restaurant.service";
import { RestaurantController } from "../controllers/restaurant.controller";

import { AuthMiddleware } from "../middleware/auth.middleware";
import { authorize } from "../middleware/authorize.middleware";
import { validate } from "../middleware/validate";
import { updateRestaurantSchema } from "../validators/restaurant.validator";

const router = Router()
const authMiddleware = new AuthMiddleware()
const restaurantRepository = new RestaurantRepository(prisma)
const restaurantService = new RestaurantService(restaurantRepository)
const restaurantController = new RestaurantController(restaurantService)

router.patch(
  "/restaurant",
  authMiddleware.authenticate.bind(authMiddleware),
  validate(updateRestaurantSchema),
  authorize("OWNER"),
  restaurantController.updateRestaurant.bind(restaurantController)
)

export default router