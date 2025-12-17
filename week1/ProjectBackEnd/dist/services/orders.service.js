import { getPrisma } from "../prisma";
const prisma = getPrisma();
export const checkoutOrder = async (userId, items) => {
    if (!items || items.length === 0) {
        throw new Error("Items tidak boleh kosong");
    }
    return await prisma.$transaction(async (tx) => {
        let total = 0;
        const orderItemsData = [];
        // 1️⃣ ambil data product asli + hitung total
        for (const item of items) {
            const product = await tx.product.findUnique({
                where: { id: item.productId }
            });
            if (!product) {
                throw new Error(`Product ID ${item.productId} not found`);
            }
            if (product.stock < item.quantity) {
                throw new Error(`Stock product ${product.name} tidak cukup`);
            }
            const price = Number(product.price);
            total += price * item.quantity;
            orderItemsData.push({
                quantity: item.quantity,
                priceAtTime: product.price,
                product: {
                    connect: { id: item.productId }
                }
            });
            await tx.product.update({
                where: { id: product.id },
                data: {
                    stock: { decrement: item.quantity }
                }
            });
        }
        const order = await tx.order.create({
            data: {
                total,
                user: {
                    connect: { id: userId }
                },
                items: {
                    create: orderItemsData
                }
            },
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
            }
        });
        return order;
    });
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
export const createOrder = async (data) => {
    const user = await prisma.user.findUnique({
        where: { id: data.userId }
    });
    if (!user)
        throw new Error("User tidak ditemukan");
    const products = await Promise.all(data.items.map(async (item) => {
        const product = await prisma.product.findUnique({
            where: {
                id: item.productId
            }
        });
        if (!product)
            throw new Error(`Product dengan ID ${item.productId} tidak ditemukan`);
        return {
            product_id: item.productId,
            quantity: item.quantity,
            priceAtTime: product.price
        };
    }));
    const total = products.reduce((sum, item) => sum + Number(item.priceAtTime) * item.quantity, 0);
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
                    quantity: item.quantity,
                    priceAtTime: item.priceAtTime
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