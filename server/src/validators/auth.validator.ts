import { z } from "zod";

export const registerSchema = z.object({
  restaurantName: z.string().min(1),
  ownerName: z.string().min(1),
  email: z.email(),
  password: z.string().min(8),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const cashierRegisterSchema = z.object({
  name: z.string().min(1),
  username: z.string().min(1).optional(),
  email: z.string().email().optional(),
  password: z.string().min(8),
});