import { Prisma } from "@prisma/client"

export class OrderRepository {
  constructor(private prisma: Prisma.TransactionClient) {}

  async createOrder(data: Prisma.OrderCreateInput) {
    return this.prisma.order.create({
      data,
      include: {
        orderItems: true,
      }
    })
  }

  async findLatestOrder(
    restaurantId: string,
    orderDate: Date
  ) {
    return this.prisma.order.findFirst({
      where: {
        restaurantId,
        orderDate,
      },
      orderBy: {
        orderNumber: "desc",
      },
    })
  }

}