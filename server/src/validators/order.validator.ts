import { z } from "zod"

export const createOrderSchema = z.object({
  items: z
    .array(
      z.object({
        menuItemId: z.string().uuid(),
        quantity: z.number().int().positive(),
      })
    )
    .min(1, "Order must contain at least one item"),

  paymentMethod: z.enum(["CASH", "QRIS"]),
  cashReceived: z.number().int().positive().optional(),
})