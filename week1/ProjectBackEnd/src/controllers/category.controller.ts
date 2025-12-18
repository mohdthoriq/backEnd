import type { Request, Response } from "express";
import { createCategory, deleteCategory, getAllCategories, getCategoryById, updateCategories } from "../services/category.service";
import { successResponse } from "../utils/response";

export const getAll = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const search = req.query.search as any
  const sortBy = req.query.sortBy as string
  const sortOrder = req.query.sortOrder as "asc" | "desc"

  const result = await getAllCategories({
    page,
    limit,
    search,
    sortBy,
    sortOrder,
  })

  const pagination = {
    page: result.currentPage,
    limit,
    total: result.total,
    totalPages: result.totalPages,
  }

  successResponse(
    res,
    "Daftar Category ditemukan",
    result,
    pagination
  )
}

export const getById = async (req: Request, res: Response) => {
    if (!req.params.id) {
        throw new Error("ID category tidak ditemukan");
    }

    const category = await getCategoryById(req.params.id);

    successResponse(res, 'Category retrieved successfully', category);
}

export const create = async (req: Request, res: Response) => {
    const category = await createCategory(req.body.name);

    successResponse(res, 'Category created successfully', category);
}

export const update = async (req: Request, res: Response) => {
    if (!req.params.id) {
        throw new Error("ID category tidak ditemukan");
    }

    const category = await updateCategories(req.params.id!, req.body);

    successResponse(res, 'Category updated successfully', category);
}

export const remove = async (req: Request, res: Response) => {
    if (!req.params.id) {
        throw new Error("ID category tidak ditemukan");
    }

    const category = await deleteCategory(req.params.id);

    successResponse(res, 'Category deleted successfully', category);
}

