import type { Order } from "../src/generated/prisma/client";
export interface CreateOrder {
    userId: number;
    total: number;
    orderItems: OrderItems[];
}
export interface OrderItems {
    productId: number;
    quantity: number;
}
export declare const checkoutOrder: (data: CreateOrder) => Promise<void>;
export declare const getAllOrders: () => Promise<Order[]>;
export declare const getOrderById: (id: number) => Promise<Order>;
export declare const searchOrders: (userId?: number, maxTotal?: number, minTotal?: number) => Promise<({
    items: ({
        product: {
            name: string;
            id: number;
            description: string | null;
            price: import("@prisma/client-runtime-utils").Decimal;
            stock: number;
            categoryId: number | null;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
        };
    } & {
        id: number;
        quantity: import("@prisma/client-runtime-utils").Decimal;
        product_id: number;
        order_id: number;
    })[];
} & {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    total: import("@prisma/client-runtime-utils").Decimal;
    user_id: number;
})[]>;
export declare const createOrder: (userId: number, items: {
    productId: number;
    quantity: number;
}[]) => Promise<{
    items: ({
        product: {
            name: string;
            id: number;
            description: string | null;
            price: import("@prisma/client-runtime-utils").Decimal;
            stock: number;
            categoryId: number | null;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
        };
    } & {
        id: number;
        quantity: import("@prisma/client-runtime-utils").Decimal;
        product_id: number;
        order_id: number;
    })[];
} & {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    total: import("@prisma/client-runtime-utils").Decimal;
    user_id: number;
}>;
export declare const updateOrder: (id: number, items: {
    productId: number;
    quantity: number;
}[]) => Promise<{
    items: ({
        product: {
            name: string;
            id: number;
            description: string | null;
            price: import("@prisma/client-runtime-utils").Decimal;
            stock: number;
            categoryId: number | null;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
        };
    } & {
        id: number;
        quantity: import("@prisma/client-runtime-utils").Decimal;
        product_id: number;
        order_id: number;
    })[];
} & {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    total: import("@prisma/client-runtime-utils").Decimal;
    user_id: number;
}>;
export declare const deleteOrder: (id: number) => Promise<Order>;
//# sourceMappingURL=orders.service.d.ts.map