import type { Request, Response } from "express"
import { successResponse } from "../utils/response"
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "../services/product.service"

export const getAll = async(req: Request, res: Response) => {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const search = req.query.search as any
    const sortBy = req.query.sortBy as string
    const sortOrder = req.query.sortOrder as "asc" | "desc"

    const result = await getAllProducts({
            page,
            limit,
            search,
            sortBy,
            sortOrder
    })

    const pagination = {
        page: result.currentPage,
        limit,
        total: result.total,
        totalPages: result.totalPages
    }

    successResponse(
        res,
        "Daftar Product ditemukan",
       result,
       pagination
    )
}

export const getById = async(req: Request, res: Response) => {
    if (!req.params.id) {
        throw new Error("ID tidak ditemukan");
    }

    const product = await getProductById(req.params.id);

    successResponse(
        res,
        "Product ditemukan",
        product,
    )
}

export const create = async(req: Request, res: Response) => {
    const file = req.file
    if (!file) throw new Error("image is required");

    const { name, description, price, stock, categoryId } = req.body;

    const imageURL = `/public/uploads/${file.filename}`

    const data = {
       name: String(name),
       price: Number(price),
       stock: Number(stock),
       categoryId: Number(categoryId),
       ...(description && { description: String(description) }),
       image: imageURL
    };

    const newProduct = await createProduct(data);

    successResponse(
        res,
        "product berhasil ditambahkan",
        newProduct,
        null,
        201
    )
}

export const update = async(req: Request, res: Response) => {
    if (!req.params.id) {
        throw new Error("ID tidak ditemukan");
    }

    const product = await updateProduct(req.params.id!, req.body);


    successResponse(
        res,
        "Product berhasil diperbarui",
        product,
    )
}

export const remove = async(req: Request, res: Response) => {

    const deleted = await deleteProduct(req.params.id!);

    successResponse(
        res,
        "product berhasil dihapus",
        deleted,
    )
}
