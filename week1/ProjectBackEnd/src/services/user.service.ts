import { getPrisma } from "../prisma";

const prisma = getPrisma();

export const loginUser = async (
    username: string,
    email: string,
    password: string
) => {
    const user = await prisma.user.findUnique({
        where: {
            email,
        }
    });

    if (!user) {
        throw new Error("User tidak ditemukan");
    }


    if (user.password !== password) {
        throw new Error("Username, email, atau password salah");
    }

    return {
        id: user.id,
        username: user.username,
        email: user.email,
        token: user.token
    };
};
