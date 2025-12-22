import type { Prisma, PrismaClient, Product } from "../src/generated/prisma/client";
export interface IProductRepository {
    list(skip: number, take: number, where: Prisma.ProductWhereInput, orderBy: Prisma.ProductOrderByWithRelationInput): Promise<Product[]>;
    countAll(where: Prisma.ProductWhereInput): Promise<number>;
    findById(id: number): Promise<Product | null>;
    create(data: Prisma.ProductCreateInput): Promise<Product>;
    update(id: number, data: Prisma.ProductUpdateInput): Promise<Product>;
    softDelete(id: number): Promise<Product>;
}
export declare class ProductRepository implements IProductRepository {
    private prisma;
    constructor(prisma: PrismaClient);
    list(skip: number, take: number, where: Prisma.ProductWhereInput, orderBy: Prisma.ProductOrderByWithRelationInput): Promise<Product[]>;
    countAll(where: Prisma.ProductWhereInput): Promise<number>;
    findById(id: number): Promise<({
        category: {
            name: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
        } | null;
    } & {
        name: string;
        description: string | null;
        price: import("@prisma/client-runtime-utils").Decimal;
        stock: number;
        categoryId: number | null;
        id: number;
        image: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }) | null>;
    create(data: Prisma.ProductCreateInput): Promise<{
        name: string;
        description: string | null;
        price: import("@prisma/client-runtime-utils").Decimal;
        stock: number;
        categoryId: number | null;
        id: number;
        image: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
    update(id: number, data: Prisma.ProductUpdateInput): Promise<{
        name: string;
        description: string | null;
        price: import("@prisma/client-runtime-utils").Decimal;
        stock: number;
        categoryId: number | null;
        id: number;
        image: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
    softDelete(id: number): Promise<{
        name: string;
        description: string | null;
        price: import("@prisma/client-runtime-utils").Decimal;
        stock: number;
        categoryId: number | null;
        id: number;
        image: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
}
//# sourceMappingURL=product.repository.d.ts.map