import prisma from "../prisma/client";
import { OrderRepository } from "../repositories/order.repository";
import { MenuRepository } from "../repositories/menu.repository";
import type { CreateOrderInput } from "../types/order.types";
import { AppError } from "../utils/AppError";
import { getRestaurantDate } from "../utils/date"

export class OrderService {
  constructor(
    private orderRepository: OrderRepository, 
    private menuRepository: MenuRepository) {}

  async createOrder(
    data: CreateOrderInput,
    restaurantId: string, 
    cashierId: string
  ) {
    const { items, paymentMethod, cashReceived } = data

    // get all menu id from input
    const menuItemsIds = items.map(
      item => item.menuItemId
    )
    // find each menu
    const menuItems = await this.menuRepository.findByIds(
      menuItemsIds,
      restaurantId
    )
    // verified each menu id is exist
    if (menuItems.length !== items.length) {
      throw new AppError("One or more menu items are invalid", 404)
    }
    // take each order item
    const orderItems = items.map(item => {
      const menuItem = menuItems.find(
        menu => menu.id === item.menuItemId
      )
      if (!menuItem) {
        throw new AppError("Menu does not exist", 404)
      }
      const subtotal = Number(menuItem.price) * item.quantity

      return {
        menuItemId: menuItem.id,
        menuName: menuItem.name,
        unitPrice: Number(menuItem.price),
        quantity: item.quantity,
        subtotal,
      }
    })
    
    // total price all menu
    const totalAmount = orderItems.reduce(
      (total, item) => total + item.subtotal,
      0
    )
    // check payment method
    if (paymentMethod === "CASH") {
      if (cashReceived === undefined) {
        throw new AppError(
          "Cash received is required for cash payment",
          400
        )
      }

      if (cashReceived < totalAmount) {
        throw new AppError(
          "Cash received is less than the total amount",
          400
        )
      }
    }
    // take new date
    const orderDate = getRestaurantDate()
    // find latest order from repo to make order number
    const latestOrder = await this.orderRepository.findLatestOrder(
      restaurantId,
      orderDate,
    )
    const orderNumber = latestOrder ? latestOrder.orderNumber + 1 : 1

    const result = await prisma.$transaction(async tx => {
      const orderRepository = new OrderRepository(tx)

      return orderRepository.createOrder({
        restaurant: {
          connect: {
            id: restaurantId,
          },
        },
        cashier: {
          connect: {
            id: cashierId,
          },
        },
        orderNumber,
        orderDate,
        totalAmount,

        orderItems: {
          create: orderItems.map(item => ({
            menuItem: {
              connect: {
                id: item.menuItemId,
              },
            },
            menuName: item.menuName,
            unitPrice: item.unitPrice,
            quantity: item.quantity,
            subtotal: item.subtotal,
          })),
        },
        paymentMethod,
        cashReceived: cashReceived ?? null,
        paidAt: new Date()
      })
    })

    return result
  }
  
}