import type { Request, Response } from "express";
import type { UserService } from "../services/user.service";
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    login: (req: Request, res: Response) => Promise<void>;
    register: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=user.controller.d.ts.map