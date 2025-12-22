import type { ICategoryRepository } from "../repository/category.repository";
import type { Category } from "../src/generated/prisma/client";
export interface FindAllCategoryParams {
    page: number;
    limit: number;
    search?: {
        name?: string;
    };
    sortBy?: string;
    sortOrder?: "asc" | "desc";
}
export interface CategoryListResponse {
    categories: Category[];
    total: number;
    totalPages: number;
    currentPage: number;
}
export interface ICategoryService {
    list(params: FindAllCategoryParams): Promise<CategoryListResponse>;
    getById(id: string): Promise<Category>;
    create(name: string): Promise<Category>;
    update(id: string, data: Partial<Category>): Promise<Category>;
    delete(id: string): Promise<Category>;
}
export declare class CategoryService implements ICategoryService {
    private categoryRepo;
    constructor(categoryRepo: ICategoryRepository);
    list(params: FindAllCategoryParams): Promise<CategoryListResponse>;
    getById(id: string): Promise<Category>;
    create(name: string): Promise<Category>;
    update(id: string, data: Partial<Category>): Promise<Category>;
    delete(id: string): Promise<Category>;
}
//# sourceMappingURL=category.service.d.ts.map