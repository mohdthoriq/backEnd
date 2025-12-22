import { successResponse } from "../utils/response";
export class CategoryController {
    categoryService;
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    async list(req, res) {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const search = req.query.search;
        const sortBy = req.query.sortBy;
        const sortOrder = req.query.sortOrder;
        const result = await this.categoryService.list({
            page,
            limit,
            search,
            sortBy,
            sortOrder
        });
        const pagination = {
            page: result.currentPage,
            limit,
            total: result.total,
            totalPages: result.totalPages
        };
        successResponse(res, "Daftar Category ditemukan", result, pagination);
    }
    async getById(req, res) {
        if (!req.params.id) {
            throw new Error("ID category tidak ditemukan");
        }
        const category = await this.categoryService.getById(req.params.id);
        successResponse(res, "Category ditemukan", category);
    }
    async create(req, res) {
        const { name } = req.body;
        if (!name) {
            throw new Error("Nama category wajib diisi");
        }
        const category = await this.categoryService.create(name);
        successResponse(res, "Category berhasil dibuat", category, null, 201);
    }
    async update(req, res) {
        if (!req.params.id) {
            throw new Error("ID category tidak ditemukan");
        }
        const category = await this.categoryService.update(req.params.id, req.body);
        successResponse(res, "Category berhasil diperbarui", category);
    }
    async remove(req, res) {
        if (!req.params.id) {
            throw new Error("ID category tidak ditemukan");
        }
        const deleted = await this.categoryService.delete(req.params.id);
        successResponse(res, "Category berhasil dihapus", deleted);
    }
}
//# sourceMappingURL=category.controller.js.map