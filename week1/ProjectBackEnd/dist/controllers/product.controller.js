import { successResponse } from "../utils/response";
export class ProductController {
    productService;
    constructor(productService) {
        this.productService = productService;
    }
    list = async (req, res) => {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const search = req.query.search;
        const sortBy = req.query.sortBy;
        const sortOrder = req.query.sortOrder;
        const result = await this.productService.list({
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
        successResponse(res, "Daftar Product ditemukan", result, pagination);
    };
    getById = async (req, res) => {
        if (!req.params.id) {
            throw new Error("ID tidak ditemukan");
        }
        const product = await this.productService.getById(req.params.id);
        successResponse(res, "Product ditemukan", product);
    };
    create = async (req, res) => {
        const file = req.file;
        if (!file)
            throw new Error("image is required");
        const { name, description, price, stock, categoryId } = req.body;
        const imageURL = `/public/uploads/${file.filename}`;
        const data = {
            name: String(name),
            price: Number(price),
            stock: Number(stock),
            categoryId: Number(categoryId),
            ...(description && { description: String(description) }),
            image: imageURL
        };
        const newProduct = await this.productService.create(data);
        successResponse(res, "product berhasil ditambahkan", newProduct, null, 201);
    };
    update = async (req, res) => {
        if (!req.params.id) {
            throw new Error("ID tidak ditemukan");
        }
        const product = await this.productService.update(req.params.id, req.body);
        successResponse(res, "Product berhasil diperbarui", product);
    };
    remove = async (req, res) => {
        const deleted = await this.productService.delete(req.params.id);
        successResponse(res, "product berhasil dihapus", deleted);
    };
    getStats = async (req, res) => {
        const stats = await this.productService.exec();
        successResponse(res, "Success", stats, null, 200);
    };
}
//# sourceMappingURL=product.controller.js.map