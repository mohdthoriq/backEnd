import type { IProductRepository } from "../repository/product.repository";
import type { Category, Product } from "../src/generated/prisma/client";
export interface FindAllParams {
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
export interface ProductListResponse {
    products: Product[];
    total: number;
    totalPages: number;
    currentPage: number;
}
export interface IProductService {
    list(params: FindAllParams): Promise<ProductListResponse>;
    getById(id: string): Promise<Product | null & Category | null>;
    create(data: {
        name: string;
        description?: string;
        price: number;
        stock: number;
        categoryId?: number;
        image: string;
    }): Promise<Product>;
    update(id: string, data: Partial<Product>): Promise<Product>;
    delete(id: string): Promise<Product>;
}
export declare class ProductService implements IProductService {
    private productRepo;
    constructor(productRepo: IProductRepository);
    list(params: FindAllParams): Promise<ProductListResponse>;
    getById(id: string): Promise<Product | null & Category | null>;
    create(data: {
        name: string;
        description?: string;
        price: number;
        stock: number;
        categoryId?: number;
        image: string;
    }): Promise<Product>;
    update(id: string, data: Partial<Product>): Promise<Product>;
    delete(id: string): Promise<Product>;
}
//# sourceMappingURL=product.service.d.ts.map