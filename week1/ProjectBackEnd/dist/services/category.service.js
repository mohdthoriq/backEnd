export class CategoryService {
    categoryRepo;
    constructor(categoryRepo) {
        this.categoryRepo = categoryRepo;
    }
    async list(params) {
        const { page, limit, search, sortBy, sortOrder } = params;
        const skip = (page - 1) * limit;
        const whereClause = {
            deletedAt: null
        };
        if (search?.name) {
            whereClause.name = {
                contains: search.name,
                mode: "insensitive"
            };
        }
        const sortCriteria = sortBy
            ? { [sortBy]: sortOrder || "desc" }
            : { createdAt: "desc" };
        const categories = await this.categoryRepo.list(skip, limit, whereClause, sortCriteria);
        const total = await this.categoryRepo.countAll(whereClause);
        return {
            categories,
            total,
            totalPages: Math.ceil(total / limit),
            currentPage: page
        };
    }
    async getById(id) {
        const numId = Number(id);
        const category = await this.categoryRepo.findById(numId);
        if (!category) {
            throw new Error("Category tidak ditemukan");
        }
        return category;
    }
    async create(name) {
        const exists = await this.categoryRepo.findByName(name);
        if (exists) {
            throw new Error("Category dengan nama ini sudah ada");
        }
        return this.categoryRepo.create({ name });
    }
    async update(id, data) {
        await this.getById(id);
        return this.categoryRepo.update(Number(id), data);
    }
    async delete(id) {
        return this.categoryRepo.softDelete(Number(id));
    }
}
//# sourceMappingURL=category.service.js.map