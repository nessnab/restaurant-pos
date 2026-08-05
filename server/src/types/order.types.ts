import type { PaymentMethod } from "@prisma/client"
export interface CreateOrderInput {
  items: {
    menuItemId: string
    quantity: number
  }[]
  paymentMethod: PaymentMethod
  cashReceived?: number
}