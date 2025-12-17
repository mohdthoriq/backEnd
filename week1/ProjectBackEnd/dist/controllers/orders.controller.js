import * as order from "../services/orders.service";
import { successResponse } from "../utils/response";
export const checkout = async (req, res) => {
    if (!req.user) {
        throw new Error("Unauthorized");
    }
    const { items } = req.body;
    const result = await order.checkoutOrder(req.user.id, items);
    successResponse(res, "Order checkout successfully", result, null, 201);
};
export const checkoutById = async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        throw new Error("ID tidak valid");
    }
    const data = await order.getCheckoutById(id);
    successResponse(res, 'Success', data);
};
export const getAll = async (req, res) => {
    const data = await order.getAllOrders();
    successResponse(res, 'Success', data);
};
export const getById = async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        throw new Error("ID tidak valid");
    }
    const data = await order.getOrderById(id);
    successResponse(res, 'Success', data);
};
export const search = async (req, res) => {
    const userId = req.query.userId ? Number(req.query.userId) : undefined;
    const minTotal = req.query.minTotal ? Number(req.query.minTotal) : undefined;
    const maxTotal = req.query.maxTotal ? Number(req.query.maxTotal) : undefined;
    const data = await order.searchOrders(userId, maxTotal, minTotal);
    successResponse(res, "Success", data);
};
export const create = async (req, res) => {
    if (!req.user) {
        throw new Error("Unauthorized");
    }
    const { items } = req.body;
    const data = await order.createOrder({
        userId: req.user.id,
        items,
    });
    successResponse(res, "Order created successfully", data);
};
export const update = async (req, res) => {
    const { id } = req.params;
    const { items } = req.body;
    const orderId = parseInt(id);
    if (isNaN(orderId)) {
        throw new Error("Order ID tidak valid");
    }
    const update = await order.updateOrder(orderId, items);
    successResponse(res, 'Order updated successfully', update);
};
export const remove = async (req, res) => {
    const { id } = req.params;
    const orderId = parseInt(id);
    if (isNaN(orderId)) {
        throw new Error("Order ID tidak valid");
    }
    await order.deleteOrder(orderId);
    successResponse(res, 'Order deleted successfully', null);
};
//# sourceMappingURL=orders.controller.js.map