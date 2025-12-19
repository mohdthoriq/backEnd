import { getPrisma } from "../prisma";
import type { Profile } from "../src/generated/prisma/client";
import * as profileRepo from "../repository/profile.repository";

const prisma = getPrisma()

export const createProfile = async (data: {
    name: string;
    gender: string;
    address: string;
    profile_picture_url?: string;
    userId: number;
}): Promise<Profile> => {
    const exist = await profileRepo.findByUserId(data.userId)
    if (exist) throw new Error("Profile sudah ada")

    return profileRepo.create(data)
}

export const getProfileById = async (id: number) => {
    const profile = await prisma.profile.findUnique({
        where: {
            id
        }
    })

    if (!profile) throw new Error("Profile tidak ditemukan")

    return profile
}

export const updateProfile = async (id: number, data: Partial<Profile>) => {
    return profileRepo.update(id, data)
}

export const deleteProfile = async (id: number) => {
   await getProfileById(id)
   return profileRepo.remove(id)
}