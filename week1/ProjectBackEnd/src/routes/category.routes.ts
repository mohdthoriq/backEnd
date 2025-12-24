import { Router } from "express";
import { validate } from "../utils/validator";
import { createCategoryValidation, getCategoryByIdValidation } from "../validations/category.validation";
import { PrismaInstance } from "../prisma";
import { CategoryRepository } from "../repository/category.repository";
import { CategoryService } from "../services/category.service";
import { CategoryController } from "../controllers/category.controller";

const router = Router();

const repo = new CategoryRepository(PrismaInstance)
const service = new CategoryService(repo)
const controller = new CategoryController(service)

/**
 * @swagger
 * tags:
 *   - name: Category
 *     description: Manajemen kategori produk
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Ambil daftar kategori (pagination & search)
 *     tags: [Category]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *           example: makanan
 *     responses:
 *       200:
 *         description: Daftar kategori berhasil diambil
 */
router.get('/', controller.list)


/**
 * @swagger
 * /categories/stats:
 *   get:
 *     summary: Statistik kategori (total produk, stok, rata-rata harga)
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: Statistik kategori berhasil diambil
 */
router.get('/stats', controller.getCategoryStats)

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Ambil detail kategori berdasarkan ID
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Kategori ditemukan
 *       404:
 *         description: Kategori tidak ditemukan
 */
router.get('/:id', validate(getCategoryByIdValidation), controller.getById);

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Buat kategori baru
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Elektronik
 *     responses:
 *       201:
 *         description: Kategori berhasil dibuat
 */
router.post('/',validate(createCategoryValidation), controller.create)

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Update kategori
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Elektronik Updated
 *     responses:
 *       200:
 *         description: Kategori berhasil diupdate
 */
router.put('/:id',controller.update);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Hapus kategori (soft delete)
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Kategori berhasil dihapus
 */
router.delete('/:id', controller.remove );

export default router;