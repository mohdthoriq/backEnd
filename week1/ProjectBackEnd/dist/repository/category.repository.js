export class CategoryRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list(skip, take, where, orderBy) {
        return this.prisma.category.findMany({
            skip,
            take,
            where,
            orderBy,
            include: {
                products: true
            }
        });
    }
    async countAll(where) {
        return this.prisma.category.count({ where });
    }
    async findById(id) {
        return this.prisma.category.findUnique({
            where: {
                id,
                deletedAt: null
            }
        });
    }
    async findByName(name) {
        return this.prisma.category.findUnique({
            where: {
                name,
                deletedAt: null
            }
        });
    }
    async create(data) {
        return this.prisma.category.create({ data });
    }
    async update(id, data) {
        return this.prisma.category.update({
            where: {
                id,
                deletedAt: null
            },
            data
        });
    }
    async softDelete(id) {
        return this.prisma.category.update({
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
//# sourceMappingURL=category.repository.js.map