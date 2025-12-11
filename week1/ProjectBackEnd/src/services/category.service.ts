import e from "express";
import { getPrisma } from "../prisma";
import type { Category } from "../src/generated/prisma/client";

const prisma = getPrisma()

export const getAllCategories = async () => {
    return await prisma.category.findMany();
}

export const getCategoryById = async (id: string) => {
    const numId = parseInt(id)

    return await prisma.category.findUnique({
        where: { id: numId },
    });
}

export const searchCategories = async (name?: string) => {
    return await prisma.category.findMany({
        where: {
            ...(name && {
                name: {
                    contains: name,
                    mode: "insensitive"
                }
            })
        },
        include: {
            products: true
        }
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
            id: numId
        },
        data
    })
}

export const deleteCategory = async (id: string): Promise<Category> => {
    const numId = parseInt(id);
    return await prisma.category.delete({
        where: {
            id: numId
        }
    })
}
