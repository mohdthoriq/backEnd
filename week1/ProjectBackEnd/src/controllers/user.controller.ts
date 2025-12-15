import type { Request, Response } from "express";
import { loginUser } from "../services/user.service";
import { successResponse } from "../utils/response";

export const login = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    const user = await loginUser(username, email, password);

    successResponse(res, "Login berhasil", {
        id: user.id,
        username: user.username,
        email: user.email,
        token: user.token
    });
};
