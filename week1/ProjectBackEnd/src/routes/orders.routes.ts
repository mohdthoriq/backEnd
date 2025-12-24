import { Router } from 'express';
import { validate } from '../utils/validator';
import { checkoutOrderValidation, createOrderValidation, getOrderByIdValidation } from '../validations/orders.validation';
import { authenticate } from '../middlewares/auth.middlleware';
import { OrderRepository } from '../repository/orders.repository';
import { PrismaInstance } from '../prisma';
import { OrderService } from '../services/orders.service';
import { OrderController } from '../controllers/orders.controller';

const router = Router();

const repo = new OrderRepository(PrismaInstance)
const service = new OrderService(PrismaInstance, repo)
const controller = new OrderController(service)

/**
 * @swagger
 * tags:
 *   - name: Order
 *     description: Manajemen pesanan
 */

/**
 * @swagger
 * /order:
 *   get:
 *     summary: Ambil list order (pagination, filter user, status)
 *     tags: [Order]
 *     responses:
 *       200:
 *         description: List order berhasil diambil
 */
router.get('/', controller.list)

/**
 * @swagger
 * /order/{id}:
 *   get:
 *     summary: Ambil detail order berdasarkan ID
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Detail order ditemukan
 *       404:
 *         description: Order tidak ditemukan
 */
router.get('/:id', validate(getOrderByIdValidation), controller.getById);

/**
 * @swagger
 * /order/checkout:
 *   post:
 *     summary: Checkout order (transaction)
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - items
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - productId
 *                     - quantity
 *                   properties:
 *                     productId:
 *                       type: integer
 *                       example: 1
 *                     quantity:
 *                       type: integer
 *                       example: 2
 *     responses:
 *       201:
 *         description: Checkout berhasil
 *       400:
 *         description: Stock tidak cukup atau data invalid
 */
router.post('/checkout', authenticate, controller.checkout);

/**
 * @swagger
 * /order:
 *   post:
 *     summary: Buat order manual (tanpa checkout)
 *     tags: [Order]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - items
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - productId
 *                     - quantity
 *                     - priceAtTime
 *                   properties:
 *                     productId:
 *                       type: integer
 *                     quantity:
 *                       type: integer
 *                     priceAtTime:
 *                       type: number
 *     responses:
 *       201:
 *         description: Order berhasil dibuat
 */
router.post('/', validate(createOrderValidation), controller.create)


/**
 * @swagger
 * /order/{id}:
 *   put:
 *     summary: Update order
 *     tags: [Order]
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
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: integer
 *                     quantity:
 *                       type: integer
 *                     priceAtTime:
 *                       type: number
 *     responses:
 *       200:
 *         description: Order berhasil diupdate
 */
router.put('/:id', controller.update);

/**
 * @swagger
 * /order/{id}:
 *   delete:
 *     summary: Hapus order
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Order berhasil dihapus
 */
router.delete('/:id', controller.remove );

export default router;