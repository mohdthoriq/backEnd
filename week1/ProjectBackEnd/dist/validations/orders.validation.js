import { body, param } from "express-validator";
export const createOrderValidation = [
    body('items')
        .isArray({ min: 1 })
        .withMessage('items wajib berupa array dan minimal 1 item'),
    body('items.*.productId')
        .notEmpty()
        .withMessage('productId wajib diisi')
        .isNumeric()
        .withMessage('productId harus berupa angka'),
    body('items.*.quantity')
        .notEmpty()
        .withMessage('quantity wajib diisi')
        .isNumeric()
        .withMessage('quantity harus berupa angka'),
];
export const getOrderByIdValidation = [
    param('id')
        .isNumeric()
        .withMessage('ID harus berupa angka'),
];
//# sourceMappingURL=orders.validation.js.map