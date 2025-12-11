import {} from "express";
export const asyncHandler = (fn) => {
    return (req, res, next) => {
        // Promise.resolve digunakan untuk memastikan fungsi fn yang dijalankan selalu mengembalikan Promise.
        // Ini penting agar .catch(next) dapat menangkap error yang terjadi, baik dari fungsi async
        // maupun fungsi synchronous yang melempar error. Tanpa asyncHandler, setiap fungsi controller
        // yang bersifat async dan berpotensi melempar error perlu dibungkus dengan try-catch manual.
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
//# sourceMappingURL=async.handler.js.map