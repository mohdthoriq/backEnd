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

router.get('/', controller.list)
router.get('/stats', controller.getStats)
router.get('/:id', validate(getProductsByIdValidation), controller.getById);
router.post('/',authenticate, upload.single('image'), validate(createProductValidation), controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove );


export default router; 