export class OrderService {
    prisma;
    orderRepo;
    constructor(prisma, orderRepo) {
        this.prisma = prisma;
        this.orderRepo = orderRepo;
    }
    async checkout(userId, items) {
        if (!items.length) {
            throw new Error("Items tidak boleh kosong");
        }
        return this.prisma.$transaction(async (tx) => {
            let total = 0;
            const orderItemsData = [];
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
                    productId: product.id,
                    quantity: item.quantity,
                    priceAtTime: price
                });
                await tx.product.update({
                    where: { id: product.id },
                    data: { stock: { decrement: item.quantity } }
                });
            }
            return this.orderRepo.checkout(userId, orderItemsData, total, tx);
        });
    }
    async getById(id) {
        if (!id || isNaN(id)) {
            throw new Error("Invalid order ID");
        }
        const order = await this.orderRepo.findById(id);
        if (!order) {
            throw new Error("Order tidak ditemukan");
        }
        return order;
    }
    async list(params) {
        const { page, limit } = params;
        if (!page || page < 1)
            throw new Error("Page tidak valid");
        if (!limit || limit < 1)
            throw new Error("Limit tidak valid");
        const { orders, total } = await this.orderRepo.findAll(params);
        return {
            orders,
            total,
            totalPages: Math.ceil(total / limit),
            currentPage: page
        };
    }
    async create(data) {
        const user = await this.prisma.user.findUnique({
            where: { id: data.userId }
        });
        if (!user)
            throw new Error("User tidak ditemukan");
        let total = 0;
        const itemsWithPrice = await Promise.all(data.items.map(async (item) => {
            const product = await this.prisma.product.findUnique({
                where: { id: item.productId }
            });
            if (!product) {
                throw new Error(`Product ID ${item.productId} tidak ditemukan`);
            }
            total += Number(product.price) * item.quantity;
            return {
                productId: product.id,
                quantity: item.quantity,
                priceAtTime: product.price
            };
        }));
        return this.orderRepo.create(data.userId, total, itemsWithPrice);
    }
    async update(id, items) {
        if (!items.length) {
            throw new Error("Items tidak boleh kosong");
        }
        let total = 0;
        const orderItems = [];
        for (const item of items) {
            const product = await this.prisma.product.findUnique({
                where: { id: item.productId }
            });
            if (!product) {
                throw new Error(`Product ID ${item.productId} tidak ditemukan`);
            }
            if (product.stock < item.quantity) {
                throw new Error(`Stock ${product.name} tidak cukup`);
            }
            total += Number(product.price) * item.quantity;
            orderItems.push({
                productId: product.id,
                quantity: item.quantity,
                priceAtTime: product.price
            });
        }
        return this.orderRepo.update(id, total, orderItems);
    }
    async delete(id) {
        if (!id || isNaN(id)) {
            throw new Error("ID order tidak valid");
        }
        const order = await this.orderRepo.findById(id);
        if (!order) {
            throw new Error("Order tidak ditemukan");
        }
        return this.orderRepo.remove(id);
    }
}
//# sourceMappingURL=orders.service.js.map