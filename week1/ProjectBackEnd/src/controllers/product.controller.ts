import type { Request, Response } from "express"
import { successResponse } from "../utils/response"
import { createBook, deleteBook, getAllBooks, getBookById, searchBooks, updateBook } from "../services/product.service"

export const getAll = (_req: Request, res: Response) => {
    const { books, total } = getAllBooks()
    successResponse(
        res,
        "Daftar buku ditemukan",
        {
            jumlah: total,
            data: books
        }
    )
}

export const getById = (req: Request, res: Response) => {
    if (!req.params.id) {
        throw new Error("ID tidak ditemukan");
    }

    const book = getBookById(req.params.id);

    successResponse(
        res,
        "Buku ditemukan",
        book,
    )
}

export const search = (req: Request, res: Response) => {
    const { name, max_price, min_price } = req.query;

    const result = searchBooks(name?.toString(), max_price?.toString(), min_price?.toString());

    successResponse(
        res,
        "Hasil pencarian ditemukan",
        result,
    )
}

export const create = (req: Request, res: Response) => {
    const { judul, penulis, tahun, harga } = req.body;

    const newBook = createBook(judul, penulis, tahun, harga);

    successResponse(
        res,
        "Buku berhasil ditambahkan",
        newBook,
        null,
        201
    )
}

export const update = (req: Request, res: Response) => {
    if (!req.params.id) {
        throw new Error("ID tidak ditemukan");
    }

    const book = updateBook(req.params.id!, req.body);


    successResponse(
        res,
        "Buku berhasil diperbarui",
        book,
    )
}

export const remove = (req: Request, res: Response) => {

    const deleted = deleteBook(req.params.id!);

    successResponse(
        res,
        "Buku berhasil dihapus",
        deleted,
    )
}
