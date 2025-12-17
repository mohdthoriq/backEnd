import * as items from '../services/order_items.service';
import { successResponse } from '../utils/response';
export const getAll = async (req, res) => {
    const data = await items.getAllItems();
    successResponse(res, 'Success', data);
};
export const getById = async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        throw new Error("ID tidak valid");
    }
    const data = await items.getItemById(id);
    successResponse(res, 'Success', data);
};
export const search = async (req, res) => {
    const orderId = req.query.orderId ? Number(req.query.orderId) : undefined;
    const productId = req.query.productId ? Number(req.query.productId) : undefined;
    const minQty = req.query.minQty ? Number(req.query.minQty) : undefined;
    const maxQty = req.query.maxQty ? Number(req.query.maxQty) : undefined;
    const data = await items.searchItems(orderId, productId, minQty, maxQty);
    successResponse(res, 'Success', data);
};
export const create = async (req, res) => {
    const { orderId, productId, quantity } = req.body;
    const parsedOrderId = Number(orderId);
    const parsedProductId = Number(productId);
    const parsedQty = Number(quantity);
    if (isNaN(parsedOrderId) ||
        isNaN(parsedProductId) ||
        isNaN(parsedQty) ||
        parsedQty <= 0) {
        throw new Error("Order ID, Product ID, atau quantity tidak valid");
    }
    const data = await items.createItem({
        orderId: parsedOrderId,
        productId: parsedProductId,
        quantity: parsedQty,
    });
    successResponse(res, "Order item created successfully", data);
};
export const update = async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        throw new Error("ID tidak valid");
    }
    const { orderId, productId, quantity } = req.body;
    const order_id = parseInt(orderId);
    const product_id = parseInt(productId);
    if (isNaN(order_id) || isNaN(product_id)) {
        throw new Error("Order ID atau Product ID tidak valid");
    }
    const data = await items.updateItem(id, { orderId: order_id, productId: product_id, quantity });
    successResponse(res, 'Order item updated successfully', data);
};
export const remove = async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        throw new Error("ID tidak valid");
    }
    await items.deleteItem(id);
    successResponse(res, 'Order item deleted successfully', null);
};
//# sourceMappingURL=order_items.cotroller.js.map