import { type NextFunction, type Request, type Response } from "express";


export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Promise.resolve digunakan untuk memastikan fungsi fn yang dijalankan selalu mengembalikan Promise.
    // Ini penting agar .catch(next) dapat menangkap error yang terjadi, baik dari fungsi async
    // maupun fungsi synchronous yang melempar error. Tanpa asyncHandler, setiap fungsi controller
    // yang bersifat async dan berpotensi melempar error perlu dibungkus dengan try-catch manual.
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
