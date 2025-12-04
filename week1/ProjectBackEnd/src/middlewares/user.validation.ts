import type { NextFunction, Request, Response } from "express";

export const authValidate = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
        throw new Error("Token tidak ditemukan");
    }

    const realToken = token.trim();

    const validUser = [
        { username: 'eko', token: 'A01' },
        { username: 'bambang', token: 'A02' }
    ]

    const user = validUser.find(u => u.token === realToken);

    if (!user) {
        throw new Error("Token tidak valid");
    }

    console.log(req.params.user, user.username)

    if (req.params.user !== user.username) {
        throw new Error("Token tidak sesuai");
    }

    next();
}