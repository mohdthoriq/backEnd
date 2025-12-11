export const apiKeyValidate = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    if (!apiKey) {
        const err = new Error("API Key tidak ditemukan");
        err.statusCode = 401;
        throw err;
    }
    if (typeof apiKey !== 'string') {
        const err = new Error("API Key harus berupa string");
        err.statusCode = 403;
        throw err;
    }
    if (apiKey !== 'katasandi123') {
        const err = new Error("API Key salah");
        err.statusCode = 403;
        throw err;
    }
    next();
};
//# sourceMappingURL=api.key.js.map