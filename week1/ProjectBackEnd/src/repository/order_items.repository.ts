import { getPrisma } from "../prisma"
import type { Prisma } from "../src/generated/prisma/client"

const prisma = getPrisma()

export const findAll = async (params: {
  skip: number
  take: number
  where: Prisma.OrderItemWhereInput
  orderBy: Prisma.OrderItemOrderByWithRelationInput
}) => {
  const { skip, take, where, orderBy } = params

  const items = await prisma.orderItem.findMany({
    skip,
    take,
    where,
    orderBy,
    include: {
      order: true,
      product: true,
    },
  })

  const total = await prisma.orderItem.count({ where })

  return { items, total }
}

export const findById = async (id: number) => {
  return prisma.orderItem.findUnique({
    where: { id },
    include: {
      order: true,
      product: true,
    },
  })
}

export const findRawById = async (id: number) => {
  return prisma.orderItem.findUnique({
    where: { id }
  })
}

export const create = async (data: {
  orderId: number
  productId: number
  quantity: number
  priceAtTime: Prisma.Decimal
}) => {
  return prisma.orderItem.create({
    data: {
      order_id: data.orderId,
      product_id: data.productId,
      quantity: data.quantity,
      priceAtTime: data.priceAtTime,
    },
    include: {
      order: true,
      product: true,
    },
  })
}

export const update = async (
  id: number,
  data: {
    orderId: number
    productId: number
    quantity: number
  }
) => {
  return prisma.orderItem.update({
    where: { id },
    data: {
      order_id: data.orderId,
      product_id: data.productId,
      quantity: data.quantity,
    },
    include: {
      order: true,
      product: true,
    },
  })
}

export const remove = async (id: number) => {
  return prisma.orderItem.delete({
    where: { id },
  })
}
