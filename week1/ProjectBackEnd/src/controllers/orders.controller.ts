import type { Request, Response } from "express";
import * as order from "../services/orders.service";
import { successResponse } from "../utils/response";


export const checkout = async (req: Request, res: Response) => {
    if (!req.user) {
    throw new Error("Unauthorized");
  }

  const { items } = req.body;

  const result = await order.checkoutOrder(req.user.id, items);

  successResponse(res, "Order checkout successfully", result, null, 201);
};

export const checkoutById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id!);
    if (isNaN(id)) {
        throw new Error("ID tidak valid");
    }

    const data = await order.getCheckoutById(id);

    successResponse(res, 'Success', data);
}

export const getAll = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const search = req.query.search as any
  const sortBy = req.query.sortBy as string
  const sortOrder = req.query.sortOrder as "asc" | "desc"

  const result = await order.getAllOrders({
    page,
    limit,
    search,
    sortBy,
    sortOrder,
  })

  const pagination = {
    page: result.currentPage,
    limit,
    total: result.total,
    totalPages: result.totalPages,
  }

  successResponse(
    res,
    "Daftar Order ditemukan",
    result,
    pagination
  )
}


export const getById = async(req: Request, res: Response) => {
    const id = parseInt(req.params.id!);
    if (isNaN(id)) {
        throw new Error("ID tidak valid");
    }

    const data = await order.getOrderById(id);

    successResponse(res, 'Success', data);
}

export const create = async(req: Request, res: Response) => {
   if (!req.user) {
    throw new Error("Unauthorized");
  }

  const { items } = req.body;


  const data = await order.createOrder({
    userId: req.user.id,
    items,
  });

  successResponse(res, "Order created successfully", data);
}

export const update = async(req: Request, res: Response) => {
    const { id } = req.params;
    const { items } = req.body;

    const orderId = parseInt(id!);
    if (isNaN(orderId)) {
        throw new Error("Order ID tidak valid");
    }

    const update = await order.updateOrder(orderId, items);

    successResponse(res, 'Order updated successfully', update);

}

export const remove = async(req: Request, res: Response) => {
    const { id } = req.params;

    const orderId = parseInt(id!);
    if (isNaN(orderId)) {
        throw new Error("Order ID tidak valid");
    }

    await order.deleteOrder(orderId);

    successResponse(res, 'Order deleted successfully', null);
}