import { z } from "zod";
import {
  uuidSchema,
  quantitySchema,
} from "./common.validator";
import { ValidationMessages } from "../constants/validation.message";

export const createOrderSchema = z.object({
  items: z
    .array(
      z.object({
        menuItemId: uuidSchema,
        quantity: quantitySchema,
      })
    )
    .min(1, ValidationMessages.orderEmpty),

  paymentMethod: z.enum(["CASH", "QRIS"]),

  cashReceived: z.number().int().positive().optional(),
});