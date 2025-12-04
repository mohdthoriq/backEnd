import type { NextFunction, Request, Response } from "express";

export const apiKeyValidate =(req: Request, res: Response, next: NextFunction) => {
    const apiKey = req.headers['x-api-key'];

    if (!apiKey) {
        const err: any = new Error("API Key tidak ditemukan");
        err.statusCode = 401;
        throw err;
    }

    if (typeof apiKey !== 'string') {
        const err: any = new Error("API Key harus berupa string");
        err.statusCode = 403;
        throw err;
    }

    if (apiKey !== 'katasandi123') {
        const err: any = new Error("API Key salah");
        err.statusCode = 403;
        throw err;
    }

    next();
}