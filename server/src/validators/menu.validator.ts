import { z } from "zod"

export const menuSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1).optional(),
  price: z.number().min(4),
  categoryId: z.string().min(1).optional(),
})