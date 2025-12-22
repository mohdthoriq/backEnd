export class ProfileRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findUserById(userId) {
        return this.prisma.user.findUnique({
            where: { id: userId },
        });
    }
    async findProfileById(id) {
        return this.prisma.profile.findUnique({
            where: { id },
        });
    }
    async create(data) {
        return this.prisma.profile.create({
            data,
        });
    }
    async update(id, data) {
        return this.prisma.profile.update({
            where: { id },
            data,
        });
    }
    async remove(id) {
        return this.prisma.profile.delete({
            where: { id },
        });
    }
}
//# sourceMappingURL=profile.repository.js.map