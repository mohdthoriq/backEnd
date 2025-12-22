export class UserRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findByEmail(email) {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }
    async findById(id) {
        return this.prisma.user.findUnique({
            where: { id },
        });
    }
    async create(data) {
        return this.prisma.user.create({
            data,
        });
    }
}
//# sourceMappingURL=user.repository.js.map