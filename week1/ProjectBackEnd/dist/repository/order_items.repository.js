export class OrderItemRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(params) {
        const { skip, take, where, orderBy } = params;
        const items = await this.prisma.orderItem.findMany({
            skip,
            take,
            where,
            orderBy,
            include: {
                order: true,
                product: true,
            },
        });
        const total = await this.prisma.orderItem.count({ where });
        return { items, total };
    }
    async findById(id) {
        return this.prisma.orderItem.findUnique({
            where: { id },
            include: {
                order: true,
                product: true,
            },
        });
    }
    async findRawById(id) {
        return this.prisma.orderItem.findUnique({
            where: { id },
        });
    }
    async create(data) {
        return this.prisma.orderItem.create({
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
        });
    }
    async update(id, data) {
        return this.prisma.orderItem.update({
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
        });
    }
    async remove(id) {
        return this.prisma.orderItem.delete({
            where: { id },
        });
    }
}
//# sourceMappingURL=order_items.repository.js.map