import { getPrisma } from "../prisma"
import type { Order } from "../src/generated/prisma/client";
import * as orderRepo from "../repository/orders.repository";
import * as productRepo from "../repository/product.repository";


const prisma = getPrisma();

export interface CreateOrder {
    userId: number;
    total: number;
    orderItems: OrderItems[];
}

export interface OrderItems {
    productId: number;
    quantity: number;
}

export const checkoutOrder = async (
    userId: number,
    items: { productId: number; quantity: number }[]
) => {
    if (!items.length) {
        throw new Error("Items tidak boleh kosong")
    }

    return prisma.$transaction(async (tx) => {
        let total = 0

        const orderItemsData: {
            productId: number
            quantity: number
            priceAtTime: number
        }[] = []

        for (const item of items) {
            const product = await tx.product.findUnique({
                where: { id: item.productId }
            })

            if (!product) {
                throw new Error(`Product ID ${item.productId} not found`)
            }

            if (product.stock < item.quantity) {
                throw new Error(`Stock product ${product.name} tidak cukup`)
            }

            const price = Number(product.price)
            total += price * item.quantity

            orderItemsData.push({
                productId: product.id,
                quantity: item.quantity,
                priceAtTime: price
            })

            await tx.product.update({
                where: { id: product.id },
                data: { stock: { decrement: item.quantity } }
            })
        }

        return orderRepo.checkout(
            userId,
            orderItemsData,
            total,
            tx
        )
    })
}

export const getCheckoutById = async (id: number) => {
    if (!id || isNaN(id)) throw new Error("Invalid order ID")

    const order = await orderRepo.findById(id)

    if (!order) {
        throw new Error("Order tidak ditemukan")
    }

    return order
}

interface FindAllOrderParams {
    page: number
    limit: number
    search?: {
        userId?: number
        status?: string
    }
    sortBy?: string
    sortOrder?: "asc" | "desc"
}

interface OrderListResponse {
    orders: Order[]
    total: number
    totalPages: number
    currentPage: number
}

export const getAllOrders = async (
    params: FindAllOrderParams
): Promise<OrderListResponse> => {

    const { page, limit } = params

    if (!page || page < 1) {
        throw new Error("Page tidak valid")
    }

    if (!limit || limit < 1) {
        throw new Error("Limit tidak valid")
    }

    const { orders, total } = await orderRepo.findAll(params)

    return {
        orders,
        total,
        totalPages: Math.ceil(total / limit),
        currentPage: page
    }
}

export const getOrderById = async (id: number): Promise<Order> => {
    if (!id || isNaN(id)) {
        throw new Error("Invalid order ID");
    }

    const data = await orderRepo.findById(id);

    if (!data) {
        throw new Error("Order tidak ditemukan");
    }

    return data;
}

export const createOrder = async (data: { userId: number, items: { productId: number, quantity: number, priceAtTime: number }[] }) => {
    const user = await prisma.user.findUnique({
        where: { id: data.userId }
    })

    if (!user) throw new Error("User tidak ditemukan")

    const products = await Promise.all(data.items.map(async (item) => {
        const product = await prisma.product.findUnique({
            where: {
                id: item.productId
            }
        })
        if (!product) throw new Error(`Product dengan ID ${item.productId} tidak ditemukan`);
        return {
            product_id: item.productId,
            quantity: item.quantity,
            priceAtTime: product.price
        }

    }))

    const total = products.reduce((sum, item) => sum + Number(item.priceAtTime) * item.quantity, 0)

    return await prisma.order.create({
        data: {
            userId: data.userId,
            total,
            items: {
                create: products.map(item => ({
                    product_id: item.product_id,
                    quantity: item.quantity,
                    priceAtTime: item.priceAtTime
                }))
            }
        },
        include: {
            user: {
                select: {
                    username: true
                }
            },
            items: {
                include: {
                    product: true
                }
            }
        }
    })
}

export const updateOrder = async (
    id: number,
    items: { productId: number; quantity: number }[]
) => {
    if (!items.length) {
        throw new Error("Items tidak boleh kosong")
    }

    let total = 0
    const orderItems = []

    for (const item of items) {
        const product = await prisma.product.findUnique({
            where: { id: item.productId }
        })

        if (!product) {
            throw new Error(`Product ID ${item.productId} tidak ditemukan`)
        }

        if (product.stock < item.quantity) {
            throw new Error(`Stock ${product.name} tidak cukup`)
        }

        total += Number(product.price) * item.quantity

        orderItems.push({
            productId: product.id,
            quantity: item.quantity,
            priceAtTime: product.price
        })
    }

    return orderRepo.update(id, total, orderItems)
}

export const deleteOrder = async (id: number) => {
    if (!id || isNaN(id)) {
        throw new Error("ID order tidak valid")
    }

    const order = await orderRepo.findById(id)
    if (!order) {
        throw new Error("Order tidak ditemukan")
    }

    return orderRepo.remove(id)
}