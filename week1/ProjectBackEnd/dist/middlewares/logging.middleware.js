export const requestLogger = (req, res, next) => {
    console.log(`Request masuk : ${req.method} ${req.path}`);
    req.startTime = Date.now();
    next();
};
//# sourceMappingURL=logging.middleware.js.map