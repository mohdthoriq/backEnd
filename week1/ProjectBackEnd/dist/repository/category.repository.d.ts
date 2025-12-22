import type { Prisma, Category, PrismaClient } from "../src/generated/prisma/client";
export interface ICategoryRepository {
    list(skip: number, take: number, where: Prisma.CategoryWhereInput, orderBy: Prisma.CategoryOrderByWithRelationInput): Promise<Category[]>;
    countAll(where: Prisma.CategoryWhereInput): Promise<number>;
    findById(id: number): Promise<Category | null>;
    findByName(name: string): Promise<Category | null>;
    create(data: Prisma.CategoryCreateInput): Promise<Category>;
    update(id: number, data: Prisma.CategoryUpdateInput): Promise<Category>;
    softDelete(id: number): Promise<Category>;
}
export declare class CategoryRepository implements ICategoryRepository {
    private prisma;
    constructor(prisma: PrismaClient);
    list(skip: number, take: number, where: Prisma.CategoryWhereInput, orderBy: Prisma.CategoryOrderByWithRelationInput): Promise<Category[]>;
    countAll(where: Prisma.CategoryWhereInput): Promise<number>;
    findById(id: number): Promise<Category | null>;
    findByName(name: string): Promise<Category | null>;
    create(data: Prisma.CategoryCreateInput): Promise<Category>;
    update(id: number, data: Prisma.CategoryUpdateInput): Promise<Category>;
    softDelete(id: number): Promise<Category>;
}
//# sourceMappingURL=category.repository.d.ts.map