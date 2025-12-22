import type { Prisma, PrismaClient, Profile, User } from "../src/generated/prisma/client";
export interface IProfileRepository {
    findUserById(userId: number): Promise<User | null>;
    findProfileById(id: number): Promise<Profile | null>;
    create(data: {
        name: string;
        gender: string;
        address: string;
        profile_picture_url?: string;
        userId: number;
    }): Promise<Profile>;
    update(id: number, data: Prisma.ProfileUpdateInput): Promise<Profile>;
    remove(id: number): Promise<Profile>;
}
export declare class ProfileRepository implements IProfileRepository {
    private prisma;
    constructor(prisma: PrismaClient);
    findUserById(userId: number): Promise<User | null>;
    findProfileById(id: number): Promise<Profile | null>;
    create(data: {
        name: string;
        gender: string;
        address: string;
        profile_picture_url?: string;
        userId: number;
    }): Promise<Profile>;
    update(id: number, data: Prisma.ProfileUpdateInput): Promise<Profile>;
    remove(id: number): Promise<Profile>;
}
//# sourceMappingURL=profile.repository.d.ts.map