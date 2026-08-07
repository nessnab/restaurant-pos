import { z } from "zod";
import { categoryNameSchema } from "./common.validator";
import { ValidationMessages } from "../constants/validation.message";

export const createCategorySchema = z.object({
  name: categoryNameSchema,
});

export const updateCategorySchema = z
  .object({
    name: categoryNameSchema.optional(),
  })
  .refine(
    (data) => Object.keys(data).length > 0,
    {
      message: ValidationMessages.atLeastOne,
    }
  );