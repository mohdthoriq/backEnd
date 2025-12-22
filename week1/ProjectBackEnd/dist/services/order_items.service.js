export class OrderItemService {
    prisma;
    orderItemRepo;
    constructor(prisma, orderItemRepo) {
        this.prisma = prisma;
        this.orderItemRepo = orderItemRepo;
    }
    async list(params) {
        const { page, limit, search, sortBy, sortOrder } = params;
        const skip = (page - 1) * limit;
        const where = {};
        if (search?.name) {
            where.product = {
                name: {
                    contains: search.name,
                    mode: "insensitive",
                },
            };
        }
        const orderBy = sortBy
            ? { [sortBy]: sortOrder || "desc" }
            : { order: { createdAt: "desc" } };
        const { items, total } = await this.orderItemRepo.findAll({
            skip,
            take: limit,
            where,
            orderBy,
        });
        return {
            items,
            total,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
        };
    }
    async getById(id) {
        const item = await this.orderItemRepo.findById(id);
        if (!item)
            throw new Error("Order item tidak ditemukan");
        return item;
    }
    async create(data) {
        const order = await this.prisma.order.findUnique({
            where: { id: data.orderId },
        });
        if (!order)
            throw new Error("Order tidak ditemukan");
        const product = await this.prisma.product.findUnique({
            where: { id: data.productId },
        });
        if (!product)
            throw new Error("Product tidak ditemukan");
        return this.orderItemRepo.create({
            orderId: data.orderId,
            productId: data.productId,
            quantity: data.quantity,
            priceAtTime: product.price,
        });
    }
    async update(id, data) {
        const exist = await this.orderItemRepo.findRawById(id);
        if (!exist)
            throw new Error("Order item tidak ditemukan");
        return this.orderItemRepo.update(id, data);
    }
    async delete(id) {
        const exist = await this.orderItemRepo.findRawById(id);
        if (!exist)
            throw new Error("Order item tidak ditemukan");
        await this.orderItemRepo.remove(id);
    }
}
//# sourceMappingURL=order_items.service.js.map