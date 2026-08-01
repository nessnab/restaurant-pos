import type { Request, Response, NextFunction } from "express"
import type { AuthService } from "../services/auth.service"

export class AuthController {
  constructor(private authService: AuthService){}

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.authService.register(req.body)
      res.status(201).json(result)
    }
    catch (error) {
      next(error)
    }
  }
}