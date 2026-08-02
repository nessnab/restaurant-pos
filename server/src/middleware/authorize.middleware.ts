import type { Request, Response, NextFunction } from "express"
import { AppError } from "../utils/AppError"

export function authorize(...allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new AppError("Unauthenticated", 401);
    }
    if (!allowedRoles.includes(req.user.role)) {
      throw new AppError("Unauthorized", 403);
    }
    next();
  };
}