import { getPrisma } from "../prisma";
import { getItemById } from "./order_items.service";
const prisma = getPrisma();
export const checkoutOrder = async (data) => {
    // hitung harga total
    let total = 0;
    const productIds = await data.orderItems.map(i => i.productId);
    for (const id of productIds) {
        const price = await prisma.product.findUnique({
            where: {
                id,
            },
            select: {
                price: true
            }
        });
        total += Number(price?.price);
    }
    // buat order
    try {
        const result = await prisma.$transaction(async (tx) => {
            const newOrder = await tx.order.create({
                data: {
                    user_id: data.userId,
                    total
                }
            });
            for (const item of data.orderItems) {
                await tx.orderItem.create({
                    data: {
                        order_id: newOrder.id,
                        product_id: item.productId,
                        quantity: item.quantity,
                    }
                });
            }
            return newOrder;
        });
    }
    catch (error) {
        throw new Error(`gagal checkout order: ${error}`);
    }
};
export const getCheckoutById = async (id) => {
    return await prisma.order.findUnique({
        where: {
            id
        },
        include: {
            user: {
                select: {
                    username: true,
                }
            },
            items: {
                include: {
                    product: true
                }
            }
        }
    });
};
export const getAllOrders = async () => {
    return await prisma.order.findMany({
        include: {
            items: {
                include: {
                    product: true
                }
            }
        }
    });
};
export const getOrderById = async (id) => {
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
    });
    if (!data) {
        throw new Error("Order tidak ditemukan");
    }
    return data;
};
export const searchOrders = async (userId, maxTotal, minTotal) => {
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
};
export const createOrder = async (userId, items) => {
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
        return Number(product.price) * Number(item.quantity);
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
    });
};
export const updateOrder = async (id, items) => {
    await getOrderById(id);
    await prisma.orderItem.deleteMany({
        where: {
            order_id: id
        }
    });
    const total = await Promise.all(items.map(async (item) => {
        const product = await prisma.product.findUnique({
            where: {
                id: item.productId
            }
        });
        if (!product) {
            throw new Error(`Product dengan ID ${item.productId} tidak ditemukan`);
        }
        return Number(product.price) * Number(item.quantity);
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
    });
};
export const deleteOrder = async (id) => {
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
};
//# sourceMappingURL=orders.service.js.map