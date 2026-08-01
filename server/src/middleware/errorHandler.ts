import type { Request, Response, NextFunction } from "express"
import { AppError } from "../utils/AppError"

export function errorHandler(
  error: unknown, 
  req: Request, 
  res: Response, 
  next: NextFunction
) {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
    })
    return
  }
  console.error(error)
  res.status(500).json({
    message: "Internal Server Error",
  })
}