import type { NextFunction, Request, Response } from "express"
import { body, param, validationResult, type ValidationChain } from "express-validator"
import { errorResponse } from "../utils/response"


export const validate = (validations: ValidationChain[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        await Promise.all(validations.map(validation => validation.run(req)))

        const errors = validationResult(req)
        if (errors.isEmpty()) {
            return next()
        }

        const errorList = errors.array().map(err => ({
            field: err.type === 'field' ? err.path : 'body',
            message: err.msg
        }))
        return errorResponse(res, 'Validation Error', 400, errorList)
    }
}

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
        .withMessage('price wajib diisi')
        .isFloat({ min: 1 })
        .withMessage('price harus berupa angka dan minimal 1'),

    body('stock')
        .notEmpty()
        .withMessage('stock wajib diisi')
        .isInt({ min: 0 })
        .withMessage('stock harus berupa angka dan minimal 0'),
];


export const getProductsByIdValidation = [
    param('id')
        .isNumeric()
        .withMessage('ID harus berupa angka')
]