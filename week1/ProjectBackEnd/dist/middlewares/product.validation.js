import { body, param } from "express-validator";
export const createProductValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('name wajib diisi')
        .isLength({ min: 3, max: 100 })
        .withMessage('name minimal 3 karakter dan maksimal 100'),
    body('description')
        .optional()
        .trim()
        .isLength({ min: 3 })
        .withMessage('description minimal 3 karakter'),
    body('price')
        .notEmpty()
        .isNumeric()
        .toFloat()
        .withMessage('price wajib diisi')
        .custom(value => value > 0).withMessage('price harus berupa angka lebih dari 1'),
    body('stock')
        .notEmpty()
        .isNumeric()
        .withMessage('stock wajib diisi')
        .custom(value => value >= 0).withMessage('stock harus berupa angka dan minimal 1'),
    body('categoryId')
        .notEmpty()
        .withMessage('categoryId wajib diisi')
        .isNumeric()
        .custom(value => value > 0).withMessage('categoryId harus berupa angka lebih dari 1')
];
export const getProductsByIdValidation = [
    param('id')
        .isNumeric()
        .withMessage('ID harus berupa angka')
];
//# sourceMappingURL=product.validation.js.map