import { body, param } from "express-validator";
export const createOrderItemValidation = [
    body('order_id')
        .notEmpty().withMessage('order_id wajib diisi')
        .isNumeric().withMessage('order_id harus berupa angka'),
    body('product_id')
        .notEmpty().withMessage('product_id wajib diisi')
        .isNumeric().withMessage('product_id harus berupa angka'),
    body('quantity')
        .notEmpty().withMessage('quantity wajib diisi')
        .isNumeric().withMessage('quantity harus berupa angka'),
];
export const getOrderItemByIdValidation = [
    param('id')
        .isNumeric()
        .withMessage('ID harus berupa angka'),
];
//# sourceMappingURL=order_items.validation.js.map