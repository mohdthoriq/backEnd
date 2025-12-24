import { Router } from "express";
import { UserRepository } from "../repository/user.repository";
import { PrismaInstance } from "../prisma";
import { UserService } from "../services/user.service";
import { UserController } from "../controllers/user.controller";
const router = Router();
const repo = new UserRepository(PrismaInstance);
const service = new UserService(repo);
const controller = new UserController(service);
/**
 * @swagger
 * tags:
 * name: Auth
 * description: Manajemen authentikasi pengguna
 */
/**
 * @swagger
 * /auth/login:
 * post:
 *     summary: Login pengguna
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: rahasia123
 * responses:
 *       200:
 *         description: Login berhasil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                 pagination:
 *                   type: object
 *                 errors:
 *                   type: object
 *       401:
 *         description: Email atau password salah
 */
/**
 * @swagger
 * /auth/register:
 * post:
 *     summary: Register pengguna
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               username:
 *                 type: string
 *                 example: user
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: rahasia123
 *               role:
 *                  type: string
 *                  example: ADMIN
 * responses:
 *       200:
 *         description: Login berhasil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: bolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                 pagination:
 *                   type: object
 *                 errors:
 *                   type: object
 *       401:
 *         description: Email atau password salah
 */
router.post('/register', controller.register);
router.post('/login', controller.login);
export default router;
//# sourceMappingURL=user.router.js.map