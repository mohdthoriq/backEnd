export class ProductRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list(skip, take, where, orderBy) {
        return await this.prisma.product.findMany({
            skip,
            take,
            where,
            orderBy,
            include: {
                category: true
            }
        });
    }
    async countAll(where) {
        return await this.prisma.product.count({
            where
        });
    }
    async findById(id) {
        return await this.prisma.product.findUnique({
            where: {
                id,
                deletedAt: null
            },
            include: {
                category: true
            }
        });
    }
    async create(data) {
        return await this.prisma.product.create({
            data
        });
    }
    async update(id, data) {
        return await this.prisma.product.update({
            where: {
                id,
                deletedAt: null
            },
            data
        });
    }
    async softDelete(id) {
        return await this.prisma.product.update({
            where: {
                id,
                deletedAt: null
            },
            data: {
                deletedAt: new Date()
            }
        });
    }
}
//# sourceMappingURL=product.repository.js.map