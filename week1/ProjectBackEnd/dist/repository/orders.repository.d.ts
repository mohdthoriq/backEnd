import type { Prisma, Order, PrismaClient } from "../src/generated/prisma/client";
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
export interface IOrderRepository {
    checkout(userId: number, items: {
        productId: number;
        quantity: number;
        priceAtTime: number;
    }[], total: number, tx: Prisma.TransactionClient): Promise<Order>;
    findById(id: number): Promise<Order | null>;
    findAll(params: FindAllOrderParams): Promise<{
        orders: Order[];
        total: number;
    }>;
    create(userId: number, total: number, items: {
        productId: number;
        quantity: number;
        priceAtTime: Prisma.Decimal;
    }[]): Promise<Order>;
    update(id: number, total: number, items: {
        productId: number;
        quantity: number;
        priceAtTime: Prisma.Decimal;
    }[]): Promise<Order>;
    remove(id: number): Promise<Order>;
}
export declare class OrderRepository implements IOrderRepository {
    private prisma;
    constructor(prisma: PrismaClient);
    checkout(userId: number, items: {
        productId: number;
        quantity: number;
        priceAtTime: number;
    }[], total: number, tx: Prisma.TransactionClient): Promise<Order>;
    findById(id: number): Promise<Order | null>;
    findAll(params: FindAllOrderParams): Promise<{
        orders: Order[];
        total: number;
    }>;
    create(userId: number, total: number, items: {
        productId: number;
        quantity: number;
        priceAtTime: Prisma.Decimal;
    }[]): Promise<Order>;
    update(id: number, total: number, items: {
        productId: number;
        quantity: number;
        priceAtTime: Prisma.Decimal;
    }[]): Promise<Order>;
    remove(id: number): Promise<Order>;
}
//# sourceMappingURL=orders.repository.d.ts.map