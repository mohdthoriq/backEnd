import { errorResponse } from "../utils/response";
export const errorHandler = (err, req, res, next) => {
    console.error('ERROR:', err.message);
    const statusCode = err.statusCode ||
        (err.message.includes('tidak ditemukan') ? 404 : 400);
    const debugInfo = process.env.NODE_ENV === 'development'
        ? { stack: err.stack }
        : null;
    errorResponse(res, err.message || 'Terjadi kesalahan server', statusCode, debugInfo);
};
//# sourceMappingURL=error.handler.js.map