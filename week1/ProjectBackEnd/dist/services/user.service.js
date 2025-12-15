import { getPrisma } from "../prisma";
const prisma = getPrisma();
export const loginUser = async (username, email, password) => {
    const user = await prisma.user.findFirst({
        where: {
            username,
            email
        }
    });
    if (!user || user.password !== password) {
        throw new Error("Username, email, atau password salah");
    }
    return {
        id: user.id,
        username: user.username,
        email: user.email,
        token: user.token
    };
};
//# sourceMappingURL=user.service.js.map