import type { Request, Response } from "express";
import { loginUser } from "../services/user.service";
import { successResponse } from "../utils/response";

export const login = (req: Request, res: Response) => {
    const { username, password } = req.body;

    const user = loginUser(username, password);

    const tokenList = user.token;

    successResponse(
        res,
        "Login berhasil",
        {
            user: username,
            token: tokenList
        }
    )
}