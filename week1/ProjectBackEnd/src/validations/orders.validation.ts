import { body, param } from "express-validator";

export const checkoutOrderValidation = [
    body('userId')
        .notEmpty()
        .withMessage('User ID wajib diisi')
        .isInt({ min: 1 })
        .withMessage('User ID harus berupa angka positif'),
    
    body('orderItems')
        .isArray({ min: 1 })
        .withMessage('Order items harus berupa array minimal 1 item'),
    
    body('orderItems.*.productId')
        .notEmpty()
        .withMessage('Product ID wajib diisi')
        .isInt({ min: 1 })
        .withMessage('Product ID harus berupa angka positif'),
    
    body('orderItems.*.quantity')
        .notEmpty()
        .withMessage('Quantity wajib diisi')
        .isInt({ min: 1, max: 100 })
        .withMessage('Quantity harus antara 1-100'),
    
    body('total')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('Total harus berupa angka positif'),
];

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
