import jwt from 'jsonwebtoken';
import config from '../utils/env';
import { errorResponse } from '../utils/response';
export const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        const err = new Error("Token tidak ditemukan");
        err.statusCode = 401;
        throw err;
    }
    const token = authHeader?.split(' ')[1];
    try {
        const payload = jwt.verify(token, config.JWT_SECRET);
        req.user = payload;
        next();
    }
    catch (error) {
        errorResponse(res, "Token tidak valid", 401);
    }
};
//# sourceMappingURL=auth.middlleware.js.map