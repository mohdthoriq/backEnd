import { createCategory, deleteCategory, getAllCategories, getCategoryById, searchCategories, updateCategories } from "../services/category.service";
import { successResponse } from "../utils/response";
export const getAll = async (req, res) => {
    const categories = await getAllCategories();
    successResponse(res, 'Categories retrieved successfully', categories);
};
export const getById = async (req, res) => {
    if (!req.params.id) {
        throw new Error("ID category tidak ditemukan");
    }
    const category = await getCategoryById(req.params.id);
    successResponse(res, 'Category retrieved successfully', category);
};
export const search = async (req, res) => {
    const { name } = req.query;
    const categories = await searchCategories(name?.toString());
};
export const create = async (req, res) => {
    const category = await createCategory(req.body.name);
    successResponse(res, 'Category created successfully', category);
};
export const update = async (req, res) => {
    if (!req.params.id) {
        throw new Error("ID category tidak ditemukan");
    }
    const category = await updateCategories(req.params.id, req.body);
    successResponse(res, 'Category updated successfully', category);
};
export const remove = async (req, res) => {
    if (!req.params.id) {
        throw new Error("ID category tidak ditemukan");
    }
    const category = await deleteCategory(req.params.id);
    successResponse(res, 'Category deleted successfully', category);
};
//# sourceMappingURL=category.controller.js.map