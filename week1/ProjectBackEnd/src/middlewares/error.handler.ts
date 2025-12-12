import type { NextFunction, Request, Response } from "express";
import { errorResponse } from "../utils/response";
import { Prisma } from "../src/generated/prisma/client";


export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('ERROR:', err.message);

  const statusCode =
    err.statusCode ||                       
    (err.message.includes('tidak ditemukan') ? 404 : 400); 

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      return errorResponse(res, `Data sudah ada {unique constraint} \n ${err.message}`, statusCode, process.env.NODE_ENV === 'development' ? { stack: err.stack } as { stack: string } : null);
    }
    if (err.code === 'P2025') {
      return errorResponse(res, `Data tidak ditemukan \n ${err.message}`, statusCode, process.env.NODE_ENV === 'development' ? { stack: err.stack } as { stack: string } : null);
    }
  }


  const debugInfo =
    process.env.NODE_ENV === 'development'
      ? { stack: err.stack }
      : null;

  errorResponse(res, err.message || 'Terjadi kesalahan server', statusCode, debugInfo);
};
