import type { Request, Response } from "express";
import { createCategory, deleteCategory, getAllCategories, getCategoryById, searchCategories, updateCategories } from "../services/category.service";
import { successResponse } from "../utils/response";

export const getAll = async (req: Request, res: Response) => {
    const categories = await getAllCategories();

    successResponse(res, 'Categories retrieved successfully', categories);
}

export const getById = async (req: Request, res: Response) => {
    if (!req.params.id) {
        throw new Error("ID category tidak ditemukan");
    }

    const category = await getCategoryById(req.params.id);

    successResponse(res, 'Category retrieved successfully', category);
}

export const search = async (req: Request, res: Response) => {
    const { name } = req.query;

    const categories = await searchCategories(name?.toString());
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

