import e from "express";
import { getPrisma } from "../prisma";
const prisma = getPrisma();
export const getAllCategories = async () => {
    return await prisma.category.findMany({
        where: {
            deletedAt: null
        },
        include: {
            products: true
        }
    });
};
export const getCategoryById = async (id) => {
    const numId = parseInt(id);
    return await prisma.category.findUnique({
        where: { id: numId, deletedAt: null },
    });
};
export const searchCategories = async (name) => {
    return await prisma.category.findMany({
        where: {
            ...(name && {
                name: {
                    contains: name,
                    mode: "insensitive"
                }
            }),
            deletedAt: null
        },
        include: {
            products: true
        }
    });
};
export const createCategory = async (name) => {
    const isExists = await prisma.category.findUnique({ where: { name } });
    if (isExists) {
        throw new Error('Category with this name already exists');
    }
    return await prisma.category.create({
        data: { name },
    });
};
export const updateCategories = async (id, data) => {
    await getCategoryById(id);
    const numId = parseInt(id);
    return await prisma.category.update({
        where: {
            id: numId,
            deletedAt: null
        },
        data
    });
};
export const deleteCategory = async (id) => {
    const numId = parseInt(id);
    return await prisma.category.delete({
        where: {
            id: numId,
            deletedAt: null
        }
    });
};
//# sourceMappingURL=category.service.js.map