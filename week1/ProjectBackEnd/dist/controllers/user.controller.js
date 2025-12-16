import * as userService from "../services/user.service";
import { successResponse } from "../utils/response";
export const login = async (req, res) => {
    const result = await userService.loginUser(req.body);
    successResponse(res, "Login berhasil", result);
};
export const register = async (req, res) => {
    const result = await userService.register(req.body);
    successResponse(res, "Registrasi berhasil", result, null, 201);
};
//# sourceMappingURL=user.controller.js.map