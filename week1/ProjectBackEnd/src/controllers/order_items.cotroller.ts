import type { Request, Response } from 'express';
import * as items from '../services/order_items.service';
import { successResponse } from '../utils/response';

export const getAll = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const search = req.query.search as any
  const sortBy = req.query.sortBy as string
  const sortOrder = req.query.sortOrder as "asc" | "desc"

  const result = await items.getAllOrderItems({
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
    "Daftar Order Items ditemukan",
    result,
    pagination
  )
}

export const getById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id!);
    if (isNaN(id)) {
        throw new Error("ID tidak valid");
    }

    const data = await items.getItemById(id);

    successResponse(res, 'Success', data);
}

export const create = async (req: Request, res: Response) => {
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

  const data = await items.createItem({
    orderId: parsedOrderId,
    productId: parsedProductId,
    quantity: parsedQty,
  });

  successResponse(res, "Order item created successfully", data);
};

export const update = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id!);
    if (isNaN(id)) {
        throw new Error("ID tidak valid");
    }

    const { orderId, productId, quantity } = req.body;

    const order_id = parseInt(orderId);
    const product_id = parseInt(productId);

    if (isNaN(order_id) || isNaN(product_id)) {
        throw new Error("Order ID atau Product ID tidak valid");
    }

    const data = await items.updateItem(id, {orderId: order_id, productId: product_id, quantity});

    successResponse(res, 'Order item updated successfully', data);
}

export const remove = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id!);
    if (isNaN(id)) {
        throw new Error("ID tidak valid");
    }

    await items.deleteItem(id);

    successResponse(res, 'Order item deleted successfully', null);
}