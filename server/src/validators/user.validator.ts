import { z } from "zod";
import {
  nameSchema,
  usernameSchema,
  emailSchema,
  passwordSchema,
} from "./common.validator";
import { ValidationMessages } from "../constants/validation.message";

export const createCashierSchema = z.object({
  name: nameSchema,
  username: usernameSchema.optional(),
  email: emailSchema.optional(),
  password: passwordSchema,
});

export const updateUserSchema = z
  .object({
    name: nameSchema.optional(),
    username: usernameSchema.optional(),
    email: emailSchema.optional(),
    isActive: z.boolean().optional(),
  })
  .refine(
    (data) => Object.keys(data).length > 0,
    {
      message: ValidationMessages.atLeastOne,
    }
  );