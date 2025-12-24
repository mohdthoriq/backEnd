import { successResponse } from "../utils/response";
export class OrderController {
    orderService;
    constructor(orderService) {
        this.orderService = orderService;
    }
    checkout = async (req, res) => {
        if (!req.user)
            throw new Error("Unauthorized");
        const { items } = req.body;
        const result = await this.orderService.checkout(req.user.id, items);
        successResponse(res, "Order checkout successfully", result, null, 201);
    };
    list = async (req, res) => {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const result = await this.orderService.list({
            page,
            limit,
            search: req.query.search,
            sortBy: req.query.sortBy,
            sortOrder: req.query.sortOrder,
        });
        const pagination = {
            page: result.currentPage,
            limit,
            total: result.total,
            totalPages: result.totalPages,
        };
        successResponse(res, "Daftar Order ditemukan", result.orders, pagination);
    };
    getById = async (req, res) => {
        const id = Number(req.params.id);
        if (isNaN(id))
            throw new Error("ID tidak valid");
        const data = await this.orderService.getById(id);
        successResponse(res, "Success", data);
    };
    create = async (req, res) => {
        if (!req.user)
            throw new Error("Unauthorized");
        const { items } = req.body;
        const data = await this.orderService.create({
            userId: req.user.id,
            items,
        });
        successResponse(res, "Order created successfully", data, null, 201);
    };
    update = async (req, res) => {
        const id = Number(req.params.id);
        if (isNaN(id))
            throw new Error("Order ID tidak valid");
        const { items } = req.body;
        const data = await this.orderService.update(id, items);
        successResponse(res, "Order updated successfully", data);
    };
    remove = async (req, res) => {
        const id = Number(req.params.id);
        if (isNaN(id))
            throw new Error("Order ID tidak valid");
        await this.orderService.delete(id);
        successResponse(res, "Order deleted successfully", null);
    };
}
//# sourceMappingURL=orders.controller.js.map