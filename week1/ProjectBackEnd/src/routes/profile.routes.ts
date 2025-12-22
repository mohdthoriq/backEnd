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

router.get('/:id', controller.getById)

router.post('/',authenticate, upload.single('profile_picture_url'), validate(createProfileValidation), controller.create)

router.put('/:id',validate(updateProfileValidation), controller.update)

router.delete('/:id', controller.remove)

export default router;