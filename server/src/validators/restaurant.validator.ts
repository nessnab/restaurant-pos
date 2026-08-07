import { z } from "zod";
import {
  restaurantNameSchema,
  addressSchema,
  phoneSchema,
  receiptFooterSchema,
} from "./common.validator";
import { ValidationMessages } from "../constants/validation.message";

export const updateRestaurantSchema = z
  .object({
    name: restaurantNameSchema.optional(),
    address: addressSchema.optional(),
    phone: phoneSchema.optional(),
    // add to schema later
    receiptFooter: receiptFooterSchema.optional(),
    logo: z.string().url().optional(),
  })
  .refine(
    (data) => Object.keys(data).length > 0,
    {
      message: ValidationMessages.atLeastOne,
    }
  );