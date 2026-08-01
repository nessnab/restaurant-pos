import { z } from "zod";

export const registerSchema = z.object({
  restaurantName: z.string().min(1),
  ownerName: z.string().min(1),
  email: z.email(),
  password: z.string().min(8),
});