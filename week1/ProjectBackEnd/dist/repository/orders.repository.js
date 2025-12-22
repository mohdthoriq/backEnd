export class OrderRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async checkout(userId, items, total, tx) {
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
                    include: { product: true }
                }
            }
        });
    }
    async findById(id) {
        return this.prisma.order.findUnique({
            where: { id },
            include: {
                user: {
                    select: { id: true, username: true }
                },
                items: {
                    include: { product: true }
                }
            }
        });
    }
    async findAll(params) {
        const { page, limit, search, sortBy, sortOrder } = params;
        const skip = (page - 1) * limit;
        const whereClause = {};
        if (search?.userId) {
            whereClause.userId = search.userId;
        }
        const orderBy = sortBy
            ? { [sortBy]: sortOrder || "desc" }
            : { createdAt: "desc" };
        const orders = await this.prisma.order.findMany({
            skip,
            take: limit,
            where: whereClause,
            orderBy,
            include: {
                items: {
                    include: { product: true }
                }
            }
        });
        const total = await this.prisma.order.count({ where: whereClause });
        return { orders, total };
    }
    async create(userId, total, items) {
        return this.prisma.order.create({
            data: {
                userId,
                total,
                items: {
                    create: items.map(item => ({
                        quantity: item.quantity,
                        priceAtTime: item.priceAtTime,
                        product: {
                            connect: { id: item.productId }
                        }
                    }))
                }
            },
            include: {
                items: {
                    include: { product: true }
                }
            }
        });
    }
    async update(id, total, items) {
        await this.prisma.orderItem.deleteMany({
            where: { order_id: id }
        });
        return this.prisma.order.update({
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
        });
    }
    async remove(id) {
        await this.prisma.orderItem.deleteMany({
            where: { order_id: id }
        });
        return this.prisma.order.delete({
            where: { id }
        });
    }
}
//# sourceMappingURL=orders.repository.js.map