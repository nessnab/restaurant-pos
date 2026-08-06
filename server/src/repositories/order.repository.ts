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

  async findAllByRestaurantId(
    restaurantId: string,
    skip: number,
    limit: number,
  ) {
    return this.prisma.order.findMany({
      where: {
        restaurantId,
      },
      include: {
        orderItems: {
          select: {
            menuName: true,
            quantity: true,
            unitPrice: true,
            subtotal: true,
          },
        },
        cashier: {
          select: {
            id: true,
            name: true,
          }
        }
      },
      orderBy: [
        { orderDate: "desc" },
        { orderNumber: "desc" },
      ],
      skip,
      take: limit
    })
  }

}