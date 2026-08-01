import type { User } from "@prisma/client";
import type { AuthUser } from "./user.types";

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}