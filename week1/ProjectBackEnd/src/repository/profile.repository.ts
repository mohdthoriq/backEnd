import { getPrisma } from "../prisma";
import type { Prisma } from "../src/generated/prisma/client";

const prisma = getPrisma()

export async function findByUserId(userId: number) {
    return await prisma.user.findUnique({
        where: {
            id: userId
        }
    })
}
export async function findById(id: number) {
    return await prisma.user.findUnique({
        where: {
            id
        }
    })
}
export async function create(data: {
    name: string;
    gender: string;
    address: string;
    profile_picture_url?: string;
    userId: number;
}){
    return prisma.profile.create({
        data
    })
}
export async function update(id: number, data:Prisma.ProfileUpdateInput){
    return prisma.profile.update({
        where: {
            id
        },
        data
    })
}

export async function remove(id: number){
    return prisma.profile.delete({
        where: {
            id
        }
    })
}