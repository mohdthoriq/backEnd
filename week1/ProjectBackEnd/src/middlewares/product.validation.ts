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

export const createBookValidation = [
    body('judul')
        .trim()
        .notEmpty()
        .withMessage('Judul harus diisi')
        .isLength({ min: 3, max: 100})
        .withMessage('Judul tidak boleh kurang dari 3 karakter atau lebih dari 100 karakter'),
    body('penulis')
        .trim()
        .notEmpty()
        .withMessage('Penulis harus diisi')
        .isLength({ min: 3 })
        .withMessage('Penulis tidak boleh kurang dari 3 karakter'),
    body('tahun')
        .trim()
        .notEmpty()
        .withMessage('Tahun harus diisi')
        .isInt({ min: 1900, max: new Date().getFullYear() }),
    body('harga')
        .trim()
        .notEmpty()
        .withMessage('Harga harus diisi')
        .isInt({ min: 10000 })
]

export const getBooksByIdValidation = [
    param('id')
        .isNumeric()
        .withMessage('ID harus berupa angka')
]