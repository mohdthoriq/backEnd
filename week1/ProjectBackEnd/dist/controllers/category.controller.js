import { successResponse } from "../utils/response";
export class CategoryController {
    categoryService;
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    list = async (req, res) => {
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
    };
    getById = async (req, res) => {
        if (!req.params.id) {
            throw new Error("ID category tidak ditemukan");
        }
        const category = await this.categoryService.getById(req.params.id);
        successResponse(res, "Category ditemukan", category);
    };
    create = async (req, res) => {
        const { name } = req.body;
        if (!name) {
            throw new Error("Nama category wajib diisi");
        }
        const category = await this.categoryService.create(name);
        successResponse(res, "Category berhasil dibuat", category, null, 201);
    };
    update = async (req, res) => {
        if (!req.params.id) {
            throw new Error("ID category tidak ditemukan");
        }
        const category = await this.categoryService.update(req.params.id, req.body);
        successResponse(res, "Category berhasil diperbarui", category);
    };
    remove = async (req, res) => {
        if (!req.params.id) {
            throw new Error("ID category tidak ditemukan");
        }
        const deleted = await this.categoryService.delete(req.params.id);
        successResponse(res, "Category berhasil dihapus", deleted);
    };
    getCategoryStats = async (req, res) => {
        const data = await this.categoryService.getCategoryDashboardStats();
        successResponse(res, "Category stats", data);
    };
}
//# sourceMappingURL=category.controller.js.map