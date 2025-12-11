import type { NextFunction, Request, Response } from "express"
import { validationResult, type ValidationChain } from "express-validator"
import { errorResponse } from "./response"

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