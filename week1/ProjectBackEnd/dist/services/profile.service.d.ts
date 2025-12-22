import type { IProfileRepository } from "../repository/profile.repository";
import type { Profile } from "../src/generated/prisma/client";
export interface IProfileService {
    create(data: {
        name: string;
        gender: string;
        address: string;
        profile_picture_url?: string;
        userId: number;
    }): Promise<Profile>;
    getById(id: number): Promise<Profile>;
    update(id: number, data: Partial<Profile>): Promise<Profile>;
    delete(id: number): Promise<void>;
}
export declare class ProfileService implements IProfileService {
    private profileRepo;
    constructor(profileRepo: IProfileRepository);
    create(data: {
        name: string;
        gender: string;
        address: string;
        profile_picture_url?: string;
        userId: number;
    }): Promise<Profile>;
    getById(id: number): Promise<Profile>;
    update(id: number, data: Partial<Profile>): Promise<Profile>;
    delete(id: number): Promise<void>;
}
//# sourceMappingURL=profile.service.d.ts.map