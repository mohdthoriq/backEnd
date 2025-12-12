import { body, param } from "express-validator";

export const createCategoryValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('name wajib diisi')
        .isLength({ min: 3, max: 50 })
        .withMessage('name minimal 3 karakter dan maksimal 50'),
]

export const getCategoryByIdValidation = [
    param('id')
        .isNumeric()
        .withMessage('ID harus berupa angka')
]