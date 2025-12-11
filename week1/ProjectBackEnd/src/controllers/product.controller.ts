import type { Request, Response } from "express"
import { successResponse } from "../utils/response"
import { createProduct, deleteProduct, getAllProducts, getProductById, searchProducts, updateProduct } from "../services/product.service"

export const getAll = async(_req: Request, res: Response) => {
    const { products, total } = await getAllProducts()
    successResponse(
        res,
        "Daftar Product ditemukan",
        {
            jumlah: total,
            data: products
        }
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

export const search = async(req: Request, res: Response) => {
    const { name, max_price, min_price } = req.query;

    const result = await searchProducts(name?.toString(), Number(max_price), Number(min_price));

    successResponse(
        res,
        "Hasil pencarian ditemukan",
        result,
    )
}

export const create = async(req: Request, res: Response) => {
    const { name, description, price, stock } = req.body;
    const data = {
       name: String(name),
       price: Number(price),
       stock: Number(stock),
       ...(description && { description: String(description) })
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
        "Buku berhasil diperbarui",
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
