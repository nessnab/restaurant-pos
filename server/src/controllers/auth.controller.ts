import type { Request, Response, NextFunction } from "express"
import type { AuthService } from "../services/auth.service"

export class AuthController {
  constructor(private authService: AuthService){}

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body
      const result = await this.authService.login(email, password)
      res.status(200).json(result)
    }
    catch (error) {
      next(error)
    }
  }

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