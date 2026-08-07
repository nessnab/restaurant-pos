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

export const cashierLoginSchema = z.object({
  restaurantSlug: z.string().min(1),
  username: z.string().min(1),
  password: z.string().min(8),
});

export const updateUserSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be at most 50 characters")
      .optional(),

    username: z
      .string()
      .trim()
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username must be at most 20 characters")
      .regex(
        /^[a-zA-Z0-9._-]+$/,
        "Username can only contain letters, numbers, dots, underscores, and hyphens"
      )
      .transform((value) => value.toLowerCase())
      .optional(),

    isActive: z.boolean().optional(),
  })
  .refine(
    (data) => Object.keys(data).length > 0,
    {
      message: "At least one field must be provided",
    }
  );