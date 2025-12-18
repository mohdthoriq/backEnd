import { getPrisma } from "../prisma"
import type { OrderItem } from "../src/generated/prisma/client"
import type { FindAllParams } from "./product.service"

const prisma = getPrisma()

interface OrderItemListResponse {
  items: OrderItem[]
  total: number
  totalPages: number
  currentPage: number
}

export const getAllOrderItems = async (
  params: FindAllParams
): Promise<OrderItemListResponse> => {
  const { page, limit, search, sortBy, sortOrder } = params

  const skip = (page - 1) * limit

  const whereClause: any = {}

  // search by product name
  if (search?.name) {
    whereClause.product = {
      name: {
        contains: search.name,
        mode: "insensitive",
      },
    }
  }

  const items = await prisma.orderItem.findMany({
    skip,
    take: limit,
    where: whereClause,
    orderBy: sortBy
  ? { [sortBy]: sortOrder || "desc" }
  : {
      order: {
        createdAt: "desc",
      },
    },
    include: {
      order: true,
      product: true,
    },
  })

  const total = await prisma.orderItem.count({
    where: whereClause,
  })

  return {
    items,
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  }
}


export const getItemById = async (id: number): Promise<OrderItem> => {
    const item = await prisma.orderItem.findUnique({
        where: {
            id
        },
        include: {
            order: true,
            product: true
        }
    })

    if (!item) {
        throw new Error("Order item tidak ditemukan");
    }
    return item;
}

export const createItem = async (data: { orderId: number, productId: number, quantity: number }): Promise<OrderItem> => {
    const order = await prisma.order.findUnique({
        where: { id: data.orderId }
    })
    if (!order) throw new Error("Order tidak ditemukan")

    const product = await prisma.product.findUnique({
        where: { id: data.productId }
    })
    if (!product) throw new Error("Product tidak ditemukan")

    return await prisma.orderItem.create({
        data: {
            order_id: data.orderId,
            product_id: data.productId,
            quantity: data.quantity,
            priceAtTime: product.price,
        },
        include: {
            order: true,
            product: true
        }
    })
}

export const updateItem = async (id: number, data: { orderId: number, productId: number, quantity: number }): Promise<OrderItem> => {
    const item = await prisma.orderItem.findUnique({
        where: {
            id
        }
    })
    if (!item) {
        throw new Error("Order item tidak ditemukan");
    }

    return await prisma.orderItem.update({
        where: {
            id
        },
        data: {
            order_id: data.orderId,
            product_id: data.productId,
            quantity: data.quantity
        },
        include: {
            order: true,
            product: true
        }
    })
}

export const deleteItem = async (id: number): Promise<void> => {
    const item = await prisma.orderItem.findUnique({
        where: {
            id
        }
    })
    if (!item) {
        throw new Error("Order item tidak ditemukan");
    }

    await prisma.orderItem.delete({
        where: {
            id
        }
    })
}