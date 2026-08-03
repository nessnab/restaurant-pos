import prisma from "../prisma/client";
import { Router } from "express"

import { CategoryRepository } from "../repositories/category.repository";
import { CategoryController } from "../controllers/category.controller";
import { CategoryService } from "../services/category.service";

import { AuthMiddleware } from "../middleware/auth.middleware";
import { authorize } from "../middleware/authorize.middleware";
import { validate } from "../middleware/validate";
import { categorySchema } from "../validators/category.validator";

const router = Router()
const authMiddleware = new AuthMiddleware()
const categoryRepository = new CategoryRepository(prisma)
const categoryService = new CategoryService(categoryRepository)
const categoryController = new CategoryController(categoryService)

router.post(
  "/category",
  authMiddleware.authenticate.bind(authMiddleware),
  validate(categorySchema),
  authorize("OWNER"),
  categoryController.createCategory.bind(categoryController)
)

router.get(
  "/categories",
  authMiddleware.authenticate.bind(authMiddleware),
  categoryController.getCategoryByRestaurantId.bind(categoryController)
)

export default router