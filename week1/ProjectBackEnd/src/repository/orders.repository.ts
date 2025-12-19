import { getPrisma } from "../prisma";
import { Prisma } from "../src/generated/prisma/client";

const prisma = getPrisma()

export interface FindAllParams {
    page: number;
    limit: number;
    search?: {
        userId?: number;
        status?: string;
    };
    sortBy?: string;
    sortOrder?: "asc" | "desc"
}

export async function checkout(
    userId: number,
    items: { productId: number; quantity: number, priceAtTime: number }[],
    total: number,
    tx: Prisma.TransactionClient
) {
    return tx.order.create({
        data: {
            userId,
            total,
            items: {
                create: items.map(item => ({
                    product_id: item.productId,
                    quantity: item.quantity,
                    priceAtTime: item.priceAtTime
                }))
            }
        },
        include: {
            user: {
                select: { id: true, username: true }
            },
            items: {
                include: {
                    product: true
                }
            }
        }
    })
}

export async function findById(id: number) {
    return await prisma.order.findUnique({
        where: { id },
        include: {
            user: {
                select: {
                    id: true,
                    username: true
                }
            },
            items: {
                include: {
                    product: true
                }
            }
        },
    })
}

export async function findAll(params: FindAllParams) {
    const { page, limit, search, sortBy, sortOrder } = params

    const skip = (page - 1) * limit

    const whereClause: Prisma.OrderWhereInput = {}

    if (search?.userId) {
        whereClause.userId = search.userId
    }

    const sortOrderCriteria: Prisma.OrderOrderByWithRelationInput = sortBy ? { [sortBy]: sortOrder || "desc" } : { createdAt: "desc" }

    const orders = await prisma.order.findMany({
        skip,
        take: limit,
        where: whereClause,
        orderBy: sortOrderCriteria,
        include: {
            items: {
                include: {
                    product: true
                }
            }
        }
    })

    const total = await prisma.order.count({ where: whereClause })

    return { orders, total }
}

export async function create(
    userId: number,
    total: number,
    items: { productId: number; quantity: number; priceAtTime: Prisma.Decimal }[]
) {
    return await prisma.order.create({
        data: {
            userId,
            total,
            items: {
                create: items.map((item) => ({
                    quantity: item.quantity,
                    priceAtTime: item.priceAtTime,
                    product: {
                        connect: { id: item.productId }
                    }
                })),
            },
        },
        include: {
            items: {
                include: { product: true },
            },
        },
    });
}

export async function update(
    id: number,
    total: number,
    items: { productId: number; quantity: number; priceAtTime: Prisma.Decimal }[]
) {
    await prisma.orderItem.deleteMany({
        where: { order_id: id }
    })

    return prisma.order.update({
        where: { id },
        data: {
            total,
            items: {
                create: items.map(item => ({
                    product_id: item.productId,
                    quantity: item.quantity,
                    priceAtTime: item.priceAtTime
                }))
            }
        },
        include: {
            items: {
                include: { product: true }
            }
        }
    })
}

export async function remove(id: number) {
    await prisma.orderItem.deleteMany({
        where: { order_id: id }
    })

    return prisma.order.delete({
        where: { id }
    })
}