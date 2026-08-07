import { z } from "zod";
import {
  categoryIdSchema,
  descriptionSchema,
  menuNameSchema,
  priceSchema,
} from "./common.validator";
import { ValidationMessages } from "../constants/validation.message";

export const createMenuSchema = z.object({
  name: menuNameSchema,
  description: descriptionSchema.optional(),
  price: priceSchema,
  categoryId: categoryIdSchema.optional(),
});

export const updateMenuSchema = z
  .object({
    name: menuNameSchema.optional(),
    description: descriptionSchema.optional(),
    price: priceSchema.optional(),
    categoryId: categoryIdSchema.optional(),
  })
  .refine(
    (data) => Object.keys(data).length > 0,
    {
      message: ValidationMessages.atLeastOne,
    }
  );