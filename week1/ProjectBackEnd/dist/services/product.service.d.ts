import type { Product } from "../src/generated/prisma/client";
export declare const getAllProducts: () => Promise<{
    products: Product[];
    total: number;
}>;
export declare const getProductById: (id: string) => Promise<Product>;
export declare const searchProducts: (name?: string, max_price?: number, min_price?: number) => Promise<Product[]>;
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
//# sourceMappingURL=product.service.d.ts.map