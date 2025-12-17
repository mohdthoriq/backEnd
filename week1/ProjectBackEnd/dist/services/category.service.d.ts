import type { Category } from "../src/generated/prisma/client";
export declare const getAllCategories: () => Promise<({
    products: {
        name: string;
        id: number;
        description: string | null;
        price: import("@prisma/client-runtime-utils").Decimal;
        stock: number;
        image: string;
        categoryId: number | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }[];
} & {
    name: string;
    id: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
})[]>;
export declare const getCategoryById: (id: string) => Promise<{
    name: string;
    id: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
} | null>;
export declare const searchCategories: (name?: string) => Promise<({
    products: {
        name: string;
        id: number;
        description: string | null;
        price: import("@prisma/client-runtime-utils").Decimal;
        stock: number;
        image: string;
        categoryId: number | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }[];
} & {
    name: string;
    id: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
})[]>;
export declare const createCategory: (name: string) => Promise<{
    name: string;
    id: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}>;
export declare const updateCategories: (id: string, data: Partial<Category>) => Promise<Category>;
export declare const deleteCategory: (id: string) => Promise<Category>;
//# sourceMappingURL=category.service.d.ts.map