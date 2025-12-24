import { Router } from 'express';
import { validate } from '../utils/validator';
import { createOrderItemValidation, getOrderItemByIdValidation } from '../validations/order_items.validation';
import { PrismaInstance } from '../prisma';
import { OrderItemRepository } from '../repository/order_items.repository';
import { OrderItemService } from '../services/order_items.service';
import { OrderItemController } from '../controllers/order_items.cotroller';

const router = Router();

const repo = new OrderItemRepository(PrismaInstance)
const service = new OrderItemService(PrismaInstance, repo)
const controller = new OrderItemController(service)

/**
 * @swagger
 * tags:
 *   - name: OrderItem
 *     description: Manajemen item dalam order
 */

/**
 * @swagger
 * /order-items:
 *   get:
 *     summary: Ambil semua order item
 *     tags: [OrderItem]
 *     responses:
 *       200:
 *         description: Data order item berhasil diambil
 */
router.get('/', controller.getAll);

/**
 * @swagger
 * /order-items/{id}:
 *   get:
 *     summary: Ambil detail order item berdasarkan ID
 *     tags: [OrderItem]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Order item ditemukan
 *       404:
 *         description: Order item tidak ditemukan
 */
router.get('/:id', validate(getOrderItemByIdValidation), controller.getById);

/**
 * @swagger
 * /order-items:
 *   post:
 *     summary: Buat order item baru
 *     tags: [OrderItem]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderId
 *               - productId
 *               - quantity
 *               - priceAtTime
 *             properties:
 *               orderId:
 *                 type: integer
 *                 example: 1
 *               productId:
 *                 type: integer
 *                 example: 2
 *               quantity:
 *                 type: integer
 *                 example: 3
 *               priceAtTime:
 *                 type: number
 *                 example: 15000
 *     responses:
 *       201:
 *         description: Order item berhasil dibuat
 */
router.post('/', validate(createOrderItemValidation), controller.create);

/**
 * @swagger
 * /order-items/{id}:
 *   put:
 *     summary: Update order item
 *     tags: [OrderItem]
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
 *               quantity:
 *                 type: integer
 *                 example: 5
 *               priceAtTime:
 *                 type: number
 *                 example: 14000
 *     responses:
 *       200:
 *         description: Order item berhasil diupdate
 */
router.put('/:id', controller.update);

/**
 * @swagger
 * /order-items/{id}:
 *   delete:
 *     summary: Hapus order item
 *     tags: [OrderItem]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Order item berhasil dihapus
 */
router.delete('/:id', controller.remove);

export default router;