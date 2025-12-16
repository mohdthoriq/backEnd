import { getPrisma } from "../prisma";
const prisma = getPrisma();
export const authValidate = async (req, _res, next) => {
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
    req.authUser = user;
    next();
};
//# sourceMappingURL=user.validation.js.map