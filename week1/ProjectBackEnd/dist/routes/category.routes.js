import { Router } from "express";
import { validate } from "../utils/validator";
import { createCategoryValidation, getCategoryByIdValidation } from "../validations/category.validation";
import { PrismaInstance } from "../prisma";
import { CategoryRepository } from "../repository/category.repository";
import { CategoryService } from "../services/category.service";
import { CategoryController } from "../controllers/category.controller";
const router = Router();
const repo = new CategoryRepository(PrismaInstance);
const service = new CategoryService(repo);
const controller = new CategoryController(service);
router.get('/', controller.list);
router.get('/:id', validate(getCategoryByIdValidation), controller.getById);
router.post('/', validate(createCategoryValidation), controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);
export default router;
//# sourceMappingURL=category.routes.js.map