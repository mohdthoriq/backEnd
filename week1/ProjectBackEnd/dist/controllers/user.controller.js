import { successResponse } from "../utils/response";
export class UserController {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    login = async (req, res) => {
        const result = await this.userService.login(req.body);
        successResponse(res, "Login berhasil", result);
    };
    register = async (req, res) => {
        const result = await this.userService.register(req.body);
        successResponse(res, "Registrasi berhasil", result, null, 201);
    };
}
//# sourceMappingURL=user.controller.js.map