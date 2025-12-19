import type { Category, Prisma } from "../src/generated/prisma/client";
import type { FindAllParams } from "./product.service";
import * as categoryRepo from "../repository/category.repository";

interface FindAllCategoryParams extends FindAllParams {
  search?: {
    name?: string
  }
}

interface CategoryListResponse {
  categories: Category[]
  total: number
  totalPages: number
  currentPage: number
}

export const getAllCategories = async (
  params: FindAllCategoryParams
): Promise<CategoryListResponse> => {
  const { page, limit, search, sortBy, sortOrder } = params

  const skip = (page - 1) * limit

  const whereClause: Prisma.CategoryWhereInput = {
    deletedAt: null,
  }

  if (search?.name) {
    whereClause.name = {
      contains: search.name,
      mode: "insensitive",
    }
  }

  const sortCriteria: any = sortBy
    ? { [sortBy]: sortOrder || "desc" }
    : { createdAt: "desc" }


  const categories = await categoryRepo.list(skip, limit, whereClause, sortCriteria)

  const total = await categoryRepo.countAll(whereClause)

  return {
    categories,
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  }
}

export const getCategoryById = async (id: string) => {
    const numId = parseInt(id)

    return await categoryRepo.findById(numId)
}

export const createCategory = async (name: string) => {
    const isExists = await categoryRepo.findByName(name);


    if (isExists) {
        throw new Error('Category with this name already exists');
    }

    return await categoryRepo.create({
        name
    })

}

export const updateCategories = async (id: string, data: Partial<Category>): Promise<Category> => {
    await getCategoryById(id);

    const numId = parseInt(id);

    return await categoryRepo.update(numId, data)
}

export const deleteCategory = async (id: string): Promise<Category> => {
    const numId = parseInt(id);
    return await categoryRepo.softDelete(numId)
}
