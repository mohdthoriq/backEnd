import { Router } from "express";
import { remove, getAll, getById, search, create, update } from "../controllers/product.controller";
import { createBookValidation, getBooksByIdValidation, validate } from "../middlewares/product.validation";

const router = Router();

router.get('/', getAll)

router.get('/:id', validate(getBooksByIdValidation), getById);

router.get('/search',search);

router.post('/', validate(createBookValidation), create);

router.put('/:id', update);

router.delete('/:id', remove );

export default router; 