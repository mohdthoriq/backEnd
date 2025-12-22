import type { Request, Response } from "express";
import { successResponse } from "../utils/response";
import type { IOrderItemService } from "../services/order_items.service";

export class OrderItemController {
  constructor(private orderItemService: IOrderItemService) {}

  getAll = async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search as any;
    const sortBy = req.query.sortBy as string;
    const sortOrder = req.query.sortOrder as "asc" | "desc";

    const result = await this.orderItemService.list({
      page,
      limit,
      search,
      sortBy,
      sortOrder,
    });

    const pagination = {
      page: result.currentPage,
      limit,
      total: result.total,
      totalPages: result.totalPages,
    };

    successResponse(
      res,
      "Daftar Order Items ditemukan",
      result.items,
      pagination
    );
  };

  getById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) throw new Error("ID tidak valid");

    const data = await this.orderItemService.getById(id);
    successResponse(res, "Success", data);
  };

  create = async (req: Request, res: Response) => {
    const { orderId, productId, quantity } = req.body;

    const parsedOrderId = Number(orderId);
    const parsedProductId = Number(productId);
    const parsedQty = Number(quantity);

    if (
      isNaN(parsedOrderId) ||
      isNaN(parsedProductId) ||
      isNaN(parsedQty) ||
      parsedQty <= 0
    ) {
      throw new Error("Order ID, Product ID, atau quantity tidak valid");
    }

    const data = await this.orderItemService.create({
      orderId: parsedOrderId,
      productId: parsedProductId,
      quantity: parsedQty,
    });

    successResponse(res, "Order item created successfully", data);
  };

  update = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) throw new Error("ID tidak valid");

    const { orderId, productId, quantity } = req.body;

    const parsedOrderId = Number(orderId);
    const parsedProductId = Number(productId);

    if (isNaN(parsedOrderId) || isNaN(parsedProductId)) {
      throw new Error("Order ID atau Product ID tidak valid");
    }

    const data = await this.orderItemService.update(id, {
      orderId: parsedOrderId,
      productId: parsedProductId,
      quantity,
    });

    successResponse(res, "Order item updated successfully", data);
  };

  remove = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) throw new Error("ID tidak valid");

    await this.orderItemService.delete(id);
    successResponse(res, "Order item deleted successfully", null);
  };
}
