import { Router } from "express";
import { createProductValidation, getProductsByIdValidation } from "../validations/product.validation";
import { validate } from "../utils/validator";
import { authenticate } from "../middlewares/auth.middlleware";
import { upload } from "../middlewares/upload.middleware";
import { ProductRepository } from "../repository/product.repository";
import { PrismaInstance } from "../prisma";
import { ProductService } from "../services/product.service";
import { ProductController } from "../controllers/product.controller";


const router = Router();

const repo = new ProductRepository(PrismaInstance)
const service = new ProductService(repo)
const controller = new ProductController(service)

/**
 * @swagger
 * tags:
 *   - name: Product
 *     description: Manajemen produk
 */

/**
 * @swagger
 * /product:
 *   get:
 *     summary: Ambil list produk (pagination, search, sort)
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: List produk berhasil diambil
 */
router.get('/', controller.list)

/**
 * @swagger
 * /product/stats:
 *   get:
 *     summary: Statistik produk (count, avg, min, max, sum)
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: Statistik produk berhasil diambil
 */
router.get('/stats', controller.getStats)

/**
 * @swagger
 * /product/{id}:
 *   get:
 *     summary: Ambil detail produk berdasarkan ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Detail produk ditemukan
 *       404:
 *         description: Produk tidak ditemukan
 */
router.get('/:id', validate(getProductsByIdValidation), controller.getById);


/**
 * @swagger
 * /product:
 *   post:
 *     summary: Tambah produk baru
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - stock
 *               - categoryId
 *             properties:
 *               name:
 *                 type: string
 *                 example: Sepatu Nike
 *               price:
 *                 type: number
 *                 example: 150000
 *               stock:
 *                 type: integer
 *                 example: 10
 *               categoryId:
 *                 type: integer
 *                 example: 1
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Produk berhasil dibuat
 */
router.post('/',authenticate, upload.single('image'), validate(createProductValidation), controller.create);

/**
 * @swagger
 * /product/{id}:
 *   put:
 *     summary: Update data produk
 *     tags: [Product]
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
 *               price:
 *                 type: number
 *               stock:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Produk berhasil diupdate
 */
router.put('/:id', controller.update);

/**
 * @swagger
 * /product/{id}:
 *   delete:
 *     summary: Hapus produk (soft delete)
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Produk berhasil dihapus
 */
router.delete('/:id', controller.remove );


export default router; 