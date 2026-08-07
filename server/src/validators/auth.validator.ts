import { z } from "zod";
import {
  restaurantNameSchema,
  restaurantSlugSchema,
  nameSchema,
  emailSchema,
  usernameSchema,
  passwordSchema,
} from "./common.validator";

export const registerSchema = z.object({
  restaurantName: restaurantNameSchema,
  ownerName: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const cashierLoginSchema = z.object({
  restaurantSlug: restaurantSlugSchema,
  username: usernameSchema,
  password: passwordSchema,
});