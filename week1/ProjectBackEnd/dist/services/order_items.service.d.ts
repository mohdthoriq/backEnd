import type { OrderItem } from "../src/generated/prisma/client";
export declare const getAllItems: () => Promise<OrderItem[]>;
export declare const getItemById: (id: number) => Promise<OrderItem>;
export declare const searchItems: (orderId?: number, productId?: number, minQty?: number, maxQty?: number) => Promise<({
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
    order: {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        total: import("@prisma/client-runtime-utils").Decimal;
        user_id: number;
    };
} & {
    id: number;
    order_id: number;
    product_id: number;
    quantity: import("@prisma/client-runtime-utils").Decimal;
})[]>;
export declare const createItem: (data: {
    orderId: number;
    productId: number;
    quantity: number;
}) => Promise<OrderItem>;
export declare const updateItem: (id: number, data: {
    orderId: number;
    productId: number;
    quantity: number;
}) => Promise<OrderItem>;
export declare const deleteItem: (id: number) => Promise<void>;
//# sourceMappingURL=order_items.service.d.ts.map