import { getPrisma } from "../prisma";
const prisma = getPrisma();
export const createProfile = async (data) => {
    const exist = await prisma.profile.findUnique({
        where: {
            userId: data.userId
        }
    });
    if (exist)
        throw new Error("Profile sudah ada");
    return await prisma.profile.create({
        data
    });
};
export const getProfileById = async (id) => {
    return await prisma.profile.findUnique({
        where: {
            id
        },
        include: {
            user: true
        }
    });
};
export const updateProfile = async (id, data) => {
    return await prisma.profile.update({
        where: {
            id
        },
        data
    });
};
export const deleteProfile = async (id) => {
    return await prisma.profile.delete({
        where: {
            id
        }
    });
};
//# sourceMappingURL=profile.service.js.map