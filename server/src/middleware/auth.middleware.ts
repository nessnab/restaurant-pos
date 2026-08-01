import prisma from "../prisma/client"
import jwt from "jsonwebtoken"
import type { Request, Response, NextFunction } from "express"
import type { AuthPayload } from "../types/jwt.types"
import { AppError } from "../utils/AppError"
import type { AuthUser } from "../types/user.types"

declare module "express" {
  interface Request {
    user?: AuthUser;
  }
}

export class AuthMiddleware {
  async authenticate(req: Request, res: Response, next: NextFunction) {
    // get token
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError("Unauthenticated, please log in", 401)
    }
    const token = authHeader.split(" ")[1];

    if (!token) {
      throw new AppError("Unauthenticated, please log in", 401)
    }

    // verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "secret"
    ) as AuthPayload;

    // get authenticated user information
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.userId
      },
      select: {
        id: true,
        restaurantId: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
      },
    });

    if (!user || !user.isActive) {
      throw new AppError("Unauthenticated, please log in", 401)
    }
    
    // attach it to req
    req.user = user;
    next()
  }

}