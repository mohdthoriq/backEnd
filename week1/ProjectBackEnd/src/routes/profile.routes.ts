import { Router } from "express";
import { validate } from "../utils/validator";
import { createProfileValidation, updateProfileValidation } from "../validations/profile.validation";
import { authenticate } from "../middlewares/auth.middlleware";
import { upload } from "../middlewares/upload.middleware";
import { ProfileRepository } from "../repository/profile.repository";
import { PrismaInstance } from "../prisma";
import { ProfileService } from "../services/profile.service";
import { ProfileController } from "../controllers/profile.controller";


const router = Router()

const repo = new ProfileRepository(PrismaInstance)
const service = new ProfileService(repo)
const controller = new ProfileController(service)

/**
 * @swagger
 * tags:
 *   - name: Profile
 *     description: Manajemen profil pengguna
 */

/**
 * @swagger
 * /profile/{id}:
 *   get:
 *     summary: Ambil data profile berdasarkan ID
 *     tags: [Profile]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Berhasil mengambil data profile
 *       404:
 *         description: Profile tidak ditemukan
 */



/**
 * @swagger
 * /profile:
 *   post:
 *     summary: Buat profile baru
 *     tags: [Profile]
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
 *               - gender
 *               - address
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               gender:
 *                 type: string
 *                 example: male
 *               address:
 *                 type: string
 *                 example: Jakarta
 *               profile_picture_url:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Profile berhasil dibuat
 */

/**
 * @swagger
 * /profile/{id}:
 *   put:
 *     summary: Update data profile
 *     tags: [Profile]
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
 *               gender:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile berhasil diupdate
 */

/**
 * @swagger
 * /profile/{id}:
 *   delete:
 *     summary: Hapus profile
 *     tags: [Profile]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Profile berhasil dihapus
 */

router.get('/:id', controller.getById)

router.post('/',authenticate, upload.single('profile_picture_url'), validate(createProfileValidation), controller.create)

router.put('/:id',validate(updateProfileValidation), controller.update)

router.delete('/:id', controller.remove)

export default router;