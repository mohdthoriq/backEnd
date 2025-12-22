import type { PrismaClient, OrderItem } from "../src/generated/prisma/client";
import type { IOrderItemRepository } from "../repository/order_items.repository";
import type { FindAllParams } from "./product.service";
export interface OrderItemListResponse {
    items: OrderItem[];
    total: number;
    totalPages: number;
    currentPage: number;
}
export interface IOrderItemService {
    list(params: FindAllParams): Promise<OrderItemListResponse>;
    getById(id: number): Promise<OrderItem>;
    create(data: {
        orderId: number;
        productId: number;
        quantity: number;
    }): Promise<OrderItem>;
    update(id: number, data: {
        orderId: number;
        productId: number;
        quantity: number;
    }): Promise<OrderItem>;
    delete(id: number): Promise<void>;
}
export declare class OrderItemService implements IOrderItemService {
    private prisma;
    private orderItemRepo;
    constructor(prisma: PrismaClient, orderItemRepo: IOrderItemRepository);
    list(params: FindAllParams): Promise<OrderItemListResponse>;
    getById(id: number): Promise<OrderItem>;
    create(data: {
        orderId: number;
        productId: number;
        quantity: number;
    }): Promise<OrderItem>;
    update(id: number, data: {
        orderId: number;
        productId: number;
        quantity: number;
    }): Promise<OrderItem>;
    delete(id: number): Promise<void>;
}
//# sourceMappingURL=order_items.service.d.ts.map