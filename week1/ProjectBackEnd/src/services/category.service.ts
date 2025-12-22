import type { ICategoryRepository } from "../repository/category.repository";
import type { Category, Prisma } from "../src/generated/prisma/client";

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

export class CategoryService implements ICategoryService {
  constructor(private categoryRepo: ICategoryRepository) {}

  async list(params: FindAllCategoryParams): Promise<CategoryListResponse> {
    const { page, limit, search, sortBy, sortOrder } = params;

    const skip = (page - 1) * limit;

    const whereClause: Prisma.CategoryWhereInput = {
      deletedAt: null
    };

    if (search?.name) {
      whereClause.name = {
        contains: search.name,
        mode: "insensitive"
      };
    }

    const sortCriteria: Prisma.CategoryOrderByWithRelationInput = sortBy
      ? { [sortBy]: sortOrder || "desc" }
      : { createdAt: "desc" };

    const categories = await this.categoryRepo.list(
      skip,
      limit,
      whereClause,
      sortCriteria
    );

    const total = await this.categoryRepo.countAll(whereClause);

    return {
      categories,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    };
  }

  async getById(id: string): Promise<Category> {
    const numId = Number(id);

    const category = await this.categoryRepo.findById(numId);

    if (!category) {
      throw new Error("Category tidak ditemukan");
    }

    return category;
  }

  async create(name: string): Promise<Category> {
    const exists = await this.categoryRepo.findByName(name);

    if (exists) {
      throw new Error("Category dengan nama ini sudah ada");
    }

    return this.categoryRepo.create({ name });
  }

  async update(id: string, data: Partial<Category>): Promise<Category> {
    await this.getById(id);

    return this.categoryRepo.update(Number(id), data);
  }

  async delete(id: string): Promise<Category> {
    return this.categoryRepo.softDelete(Number(id));
  }
}
