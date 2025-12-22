import type { IOrderRepository } from "../repository/orders.repository";
import type { Order, PrismaClient } from "../src/generated/prisma/client";
export interface FindAllOrderParams {
    page: number;
    limit: number;
    search?: {
        userId?: number;
        status?: string;
    };
    sortBy?: string;
    sortOrder?: "asc" | "desc";
}
export interface OrderListResponse {
    orders: Order[];
    total: number;
    totalPages: number;
    currentPage: number;
}
export interface IOrderService {
    checkout(userId: number, items: {
        productId: number;
        quantity: number;
    }[]): Promise<Order>;
    getById(id: number): Promise<Order>;
    list(params: FindAllOrderParams): Promise<OrderListResponse>;
    create(data: {
        userId: number;
        items: {
            productId: number;
            quantity: number;
        }[];
    }): Promise<Order>;
    update(id: number, items: {
        productId: number;
        quantity: number;
    }[]): Promise<Order>;
    delete(id: number): Promise<Order>;
}
export declare class OrderService implements IOrderService {
    private prisma;
    private orderRepo;
    constructor(prisma: PrismaClient, orderRepo: IOrderRepository);
    checkout(userId: number, items: {
        productId: number;
        quantity: number;
    }[]): Promise<Order>;
    getById(id: number): Promise<Order>;
    list(params: FindAllOrderParams): Promise<OrderListResponse>;
    create(data: {
        userId: number;
        items: {
            productId: number;
            quantity: number;
        }[];
    }): Promise<Order>;
    update(id: number, items: {
        productId: number;
        quantity: number;
    }[]): Promise<Order>;
    delete(id: number): Promise<Order>;
}
//# sourceMappingURL=orders.service.d.ts.map