import type { Request, Response } from "express";
import { successResponse } from "../utils/response";
import type { IOrderService } from "../services/orders.service";

export interface IOrderController {
  checkout(req: Request, res: Response): Promise<void>;
  list(req: Request, res: Response): Promise<void>;
  getById(req: Request, res: Response): Promise<void>;
  create(req: Request, res: Response): Promise<void>;
  update(req: Request, res: Response): Promise<void>;
  remove(req: Request, res: Response): Promise<void>;
}

export class OrderController implements IOrderController {
  constructor(private orderService: IOrderService) {}

  checkout = async (req: Request, res: Response) => {
    if (!req.user) throw new Error("Unauthorized");

    const { items } = req.body;

    const result = await this.orderService.checkout(
      req.user.id,
      items
    );

    successResponse(
      res,
      "Order checkout successfully",
      result,
      null,
      201
    );
  }

  list = async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const result = await this.orderService.list({
      page,
      limit,
      search: req.query.search as any,
      sortBy: req.query.sortBy as string,
      sortOrder: req.query.sortOrder as "asc" | "desc",
    });

    const pagination = {
      page: result.currentPage,
      limit,
      total: result.total,
      totalPages: result.totalPages,
    };

    successResponse(
      res,
      "Daftar Order ditemukan",
      result.orders,
      pagination
    );
  }

  getById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) throw new Error("ID tidak valid");

    const data = await this.orderService.getById(id);

    successResponse(res, "Success", data);
  }

  create = async (req: Request, res: Response) => {
    if (!req.user) throw new Error("Unauthorized");

    const { items } = req.body;

    const data = await this.orderService.create({
      userId: req.user.id,
      items,
    });

    successResponse(res, "Order created successfully", data, null, 201);
  }

  update = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) throw new Error("Order ID tidak valid");

    const { items } = req.body;

    const data = await this.orderService.update(id, items);

    successResponse(res, "Order updated successfully", data);
  }

  remove = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) throw new Error("Order ID tidak valid");

    await this.orderService.delete(id);

    successResponse(res, "Order deleted successfully", null);
  }
}
