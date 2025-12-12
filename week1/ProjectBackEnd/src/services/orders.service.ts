import { getPrisma } from "../prisma"
import type { Order } from "../src/generated/prisma/client";

const prisma = getPrisma();

export const getAllOrders = async (): Promise<Order[]> => {
    return await prisma.order.findMany({
        include: {
            items: {
                include: {
                    product: true
                }
            }
        }
    })
}

export const getOrderById = async (id: number): Promise<Order> => {
    const data = await prisma.order.findUnique({
        where: {
            id
        },
        include: {
            items: {
                include: {
                    product: true
                }
            }
        }
    })

    if (!data) {
        throw new Error("Order tidak ditemukan");
    }
    return data;
}

export const searchOrders = async (
    userId?: number,
    maxTotal?: number,
    minTotal?: number
) => {
    return await prisma.order.findMany({
        where: {
            ...(userId !== undefined && { user_id: userId }),

            total: {
                ...(minTotal !== undefined && { gte: minTotal }),
                ...(maxTotal !== undefined && { lte: maxTotal }),
            },
        },
        include: {
            items: {
                include: {
                    product: true
                }
            },
        }
    });
}

export const createOrder = async (userId: number, items: { productId: number, quantity: number }[]) => {
    if (!items || items.length === 0) {
        throw new Error("Items tidak boleh kosong");
    }

    const total = await Promise.all(items.map(async (item) => {
        const product = await prisma.product.findUnique({
            where: {
                id: item.productId
            }
        });
        if (!product) {
            throw new Error(`Product dengan ID ${item.productId} tidak ditemukan`);
        }
        return Number(product.price) * Number(item.quantity)
    })).then(prices => prices.reduce((a, b) => a + b, 0));

    return await prisma.order.create({
        data: {
            user_id: userId,
            total,
            items: {
                create: items.map(item => ({
                    product_id: item.productId,
                    quantity: item.quantity
                }))
            }
        },
        include: {
            items: {
                include: {
                    product: true
                }
            }
        }
    })
}

export const updateOrder = async (id: number, items: { productId: number, quantity: number }[]) => {
    await getOrderById(id);

    await prisma.orderItem.deleteMany({
        where: {
            order_id: id
        }
    })

    const total = await Promise.all(items.map(async(item) => {
        const product = await prisma.product.findUnique({
            where: {
                id: item.productId
            }
        })
        if (!product) {
            throw new Error(`Product dengan ID ${item.productId} tidak ditemukan`);
        }
        return Number(product.price) * Number(item.quantity)

    })).then(prices => prices.reduce((a, b) => a + b, 0));

    return await prisma.order.update({
        where: {
            id: id
        },
        data: {
            total,
            items: {
                create: items.map((item) => ({
                    product_id: item.productId,
                    quantity: item.quantity
                }))
            }
        },
        include: {
            items: {
                include: {
                    product: true
                }
            }
        }
    })
}

export const deleteOrder = async (id: number): Promise<Order> => {
    await getOrderById(id);

    await prisma.orderItem.deleteMany({
        where: {
            order_id: id
        }
    });

    return await prisma.order.delete({
        where: {
            id
        }
    });
}