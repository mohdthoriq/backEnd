import type { Profile } from "../src/generated/prisma/client";
export declare const createProfile: (data: {
    name: string;
    gender: string;
    address: string;
    profile_picture_url?: string;
    userId: number;
}) => Promise<Profile>;
export declare const getProfileById: (id: number) => Promise<({
    user: {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        username: string;
        email: string;
        password: string;
        role: string;
    };
} & {
    name: string;
    id: number;
    userId: number;
    gender: string;
    address: string;
    profile_picture_url: string | null;
}) | null>;
export declare const updateProfile: (id: number, data: Partial<Profile>) => Promise<{
    name: string;
    id: number;
    userId: number;
    gender: string;
    address: string;
    profile_picture_url: string | null;
}>;
export declare const deleteProfile: (id: number) => Promise<{
    name: string;
    id: number;
    userId: number;
    gender: string;
    address: string;
    profile_picture_url: string | null;
}>;
//# sourceMappingURL=profile.service.d.ts.map