import e from "express";
import { getPrisma } from "../prisma";
import type { Category } from "../src/generated/prisma/client";
import type { FindAllParams } from "./product.service";

const prisma = getPrisma()

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

  const whereClause: any = {
    deletedAt: null,
  }

  if (search?.name) {
    whereClause.name = {
      contains: search.name,
      mode: "insensitive",
    }
  }

  const categories = await prisma.category.findMany({
    skip,
    take: limit,
    where: whereClause,
    orderBy: sortBy ? { [sortBy]: sortOrder || "desc" } : { createdAt: "desc" },
    include: {
      products: true,
    },
  })

  const total = await prisma.category.count({
    where: whereClause,
  })

  return {
    categories,
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  }
}

export const getCategoryById = async (id: string) => {
    const numId = parseInt(id)

    return await prisma.category.findUnique({
        where: { id: numId, deletedAt: null },
    });
}

export const createCategory = async (name: string) => {
    const isExists = await prisma.category.findUnique({ where: { name } })

    if (isExists) {
        throw new Error('Category with this name already exists');
    }

    return await prisma.category.create({
        data: { name },
    });

}

export const updateCategories = async (id: string, data: Partial<Category>): Promise<Category> => {
    await getCategoryById(id);

    const numId = parseInt(id);

    return await prisma.category.update({
        where: {
            id: numId,
            deletedAt: null
        },
        data
    })
}

export const deleteCategory = async (id: string): Promise<Category> => {
    const numId = parseInt(id);
    return await prisma.category.delete({
        where: {
            id: numId,
            deletedAt: null
        }
    })
}
