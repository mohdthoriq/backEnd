import type { NextFunction, Request, Response } from "express";
import { getPrisma } from "../prisma";

const prisma = getPrisma();

export const authValidate = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new Error("Token tidak ditemukan");
  }

  const token = authHeader.trim();

  const user = await prisma.user.findUnique({
    where: { token }
  });

  if (!user) {
    throw new Error("Token tidak valid");
  }

  (req as any).authUser = user;

  next();
};
