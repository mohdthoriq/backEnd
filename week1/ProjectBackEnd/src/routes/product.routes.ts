import { Router } from "express";
import { remove, getAll, getById, search, create, update } from "../controllers/product.controller";
import { createProductValidation, getProductsByIdValidation } from "../validations/product.validation";
import { validate } from "../utils/validator";

const router = Router();

router.get('/', getAll)

router.get('/:id', validate(getProductsByIdValidation), getById);

router.get('/search',search);

router.post('/', validate(createProductValidation), create);

router.put('/:id', update);

router.delete('/:id', remove );

export default router; 