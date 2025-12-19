import * as orderItemRepo from "../repository/order_items.repository"
import { getPrisma } from "../prisma"
import type { FindAllParams } from "./product.service"
import type { Prisma } from "../src/generated/prisma/client"

const prisma = getPrisma()

export const getAllOrderItems = async (params: FindAllParams) => {
  const { page, limit, search, sortBy, sortOrder } = params
  const skip = (page - 1) * limit

  const where: any = {}

  if (search?.name) {
    where.product = {
      name: {
        contains: search.name,
        mode: "insensitive",
      },
    }
  }

  const orderBy: Prisma.OrderItemOrderByWithRelationInput = sortBy
    ? { [sortBy]: sortOrder || "desc" }
    : { order: { createdAt: "desc" } }

  const { items, total } = await orderItemRepo.findAll({
    skip,
    take: limit,
    where,
    orderBy,
  })

  return {
    items,
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  }
}

export const getItemById = async (id: number) => {
  const item = await orderItemRepo.findById(id)
  if (!item) throw new Error("Order item tidak ditemukan")
  return item
}

export const createItem = async (data: {
  orderId: number
  productId: number
  quantity: number
}) => {
  const order = await prisma.order.findUnique({ where: { id: data.orderId } })
  if (!order) throw new Error("Order tidak ditemukan")

  const product = await prisma.product.findUnique({
    where: { id: data.productId },
  })
  if (!product) throw new Error("Product tidak ditemukan")

  return orderItemRepo.create({
    orderId: data.orderId,
    productId: data.productId,
    quantity: data.quantity,
    priceAtTime: product.price,
  })
}

export const updateItem = async (
  id: number,
  data: { orderId: number; productId: number; quantity: number }
) => {
  const exist = await orderItemRepo.findRawById(id)
  if (!exist) throw new Error("Order item tidak ditemukan")

  return orderItemRepo.update(id, data)
}

export const deleteItem = async (id: number) => {
  const exist = await orderItemRepo.findRawById(id)
  if (!exist) throw new Error("Order item tidak ditemukan")

  await orderItemRepo.remove(id)
}
