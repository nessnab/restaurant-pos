import type { Request, Response, NextFunction } from "express"
import { ZodError } from "zod"
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
  if (error instanceof ZodError) {
    return res.status(400).json({
      message: "Validation failed",
      errors: error.issues,
    })
    return
  }
  console.error(error)
  res.status(500).json({
    message: "Internal Server Error",
  })

}