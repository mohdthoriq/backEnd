import type { NextFunction, Request, Response } from "express";
import { errorResponse } from "../utils/response";


export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('ERROR:', err.message);

  const statusCode =
    err.statusCode ||                       
    (err.message.includes('tidak ditemukan') ? 404 : 400); 

  const debugInfo =
    process.env.NODE_ENV === 'development'
      ? { stack: err.stack }
      : null;

  errorResponse(res, err.message || 'Terjadi kesalahan server', statusCode, debugInfo);
};
