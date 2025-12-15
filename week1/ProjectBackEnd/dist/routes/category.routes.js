import { Router } from "express";
import * as category from "../controllers/category.controller";
import { validate } from "../utils/validator";
import { createCategoryValidation, getCategoryByIdValidation } from "../validations/category.validation";
const router = Router();
router.get('/', category.getAll);
router.get('/:id', validate(getCategoryByIdValidation), category.getById);
router.get('/search', category.search);
router.post('/', validate(createCategoryValidation), category.create);
router.put('/:id', category.update);
router.delete('/:id', category.remove);
export default router;
//# sourceMappingURL=category.routes.js.map