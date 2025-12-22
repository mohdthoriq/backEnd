// controllers/user.controller.ts
import type { Request, Response } from "express";
import { successResponse } from "../utils/response";
import type { UserService } from "../services/user.service";

export class UserController {
  constructor(private userService: UserService) {}

  login = async (req: Request, res: Response) => {
    const result = await this.userService.login(req.body);
    successResponse(res, "Login berhasil", result);
  };

  register = async (req: Request, res: Response) => {
    const result = await this.userService.register(req.body);
    successResponse(res, "Registrasi berhasil", result, null, 201);
  };
}
