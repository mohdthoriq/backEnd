import { successResponse } from "../utils/response";
import { createProduct, deleteProduct, getAllProducts, getProductById, searchProducts, updateProduct } from "../services/product.service";
import { products } from "../models/product.model";
export const getAll = async (_req, res) => {
    const { products, total } = await getAllProducts();
    successResponse(res, "Daftar buku ditemukan", {
        jumlah: total,
        data: products
    });
};
export const getById = async (req, res) => {
    if (!req.params.id) {
        throw new Error("ID tidak ditemukan");
    }
    const product = await getProductById(req.params.id);
    successResponse(res, "Buku ditemukan", product);
};
export const search = async (req, res) => {
    const { name, max_price, min_price } = req.query;
    const result = await searchProducts(name?.toString(), Number(max_price), Number(min_price));
    successResponse(res, "Hasil pencarian ditemukan", result);
};
export const create = async (req, res) => {
    const { nama, deskripsi, harga, stok } = req.body;
    const data = {
        nama: String(nama),
        harga: Number(harga),
        stok: Number(stok),
        ...(deskripsi && { deskripsi: String(deskripsi) })
    };
    const newProduct = await createProduct(data);
    successResponse(res, "Buku berhasil ditambahkan", newProduct, null, 201);
};
export const update = async (req, res) => {
    if (!req.params.id) {
        throw new Error("ID tidak ditemukan");
    }
    const book = await updateProduct(req.params.id, req.body);
    successResponse(res, "Buku berhasil diperbarui", book);
};
export const remove = async (req, res) => {
    const deleted = await deleteProduct(req.params.id);
    successResponse(res, "Buku berhasil dihapus", deleted);
};
//# sourceMappingURL=product.controller.js.map