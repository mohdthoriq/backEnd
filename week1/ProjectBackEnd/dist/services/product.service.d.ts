import type { Product } from "../src/generated/prisma/client";
interface FindAllParams {
    page: number;
    limit: number;
    search?: {
        name?: string;
        min_price?: number;
        max_price?: number;
    };
    sortBy?: string;
    sortOrder?: "asc" | "desc";
}
interface ProductListResponse {
    products: Product[];
    total: number;
    totalPages: number;
    currentPage: number;
}
export declare const getAllProducts: (params: FindAllParams) => Promise<ProductListResponse>;
export declare const getProductById: (id: string) => Promise<Product>;
export declare const createProduct: (data: {
    name: string;
    description?: string;
    price: number;
    stock: number;
    categoryId?: number;
    image: string;
}) => Promise<Product>;
export declare const updateProduct: (id: string, data: Partial<Product>) => Promise<Product>;
export declare const deleteProduct: (id: string) => Promise<Product>;
export {};
//# sourceMappingURL=product.service.d.ts.map