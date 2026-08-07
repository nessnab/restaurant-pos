import prisma from "../prisma/client"
import { Router } from "express"

import { CategoryRepository } from "../repositories/category.repository"
import { MenuRepository } from "../repositories/menu.repository"
import { MenuService } from "../services/menu.service"
import { MenuController } from "../controllers/menu.controller"

import { AuthMiddleware } from "../middleware/auth.middleware"
import { authorize } from "../middleware/authorize.middleware"
import { validate } from "../middleware/validate"
import { createMenuSchema, updateMenuSchema } from "../validators/menu.validator"

const router = Router()
const authMiddleware = new AuthMiddleware()
const menuRepository = new MenuRepository(prisma)
const categoryRepository = new CategoryRepository(prisma)
const menuService = new MenuService(menuRepository, categoryRepository)
const menuController = new MenuController(menuService)

router.post(
  "/menu",
  authMiddleware.authenticate.bind(authMiddleware),
  validate(createMenuSchema),
  authorize("OWNER"),
  menuController.createMenuItem.bind(menuController)
)

router.get(
  "/menu",
  authMiddleware.authenticate.bind(authMiddleware),
  menuController.getMenuByRestaurantId.bind(menuController)
)

router.get(
  "/menu/:id",
  authMiddleware.authenticate.bind(authMiddleware),
  menuController.getMenuItem.bind(menuController)
)

router.patch(
  "/menu/:id",
  validate(updateMenuSchema),
  authMiddleware.authenticate.bind(authMiddleware),
  menuController.updateMenu.bind(menuController)
)

router.delete(
  "/menu/:id",
  authMiddleware.authenticate.bind(authMiddleware),
  menuController.deleteMenu.bind(menuController)
)

export default router
