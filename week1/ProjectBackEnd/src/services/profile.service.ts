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

export class ProfileService implements IProfileService {
  constructor(
    private profileRepo: IProfileRepository
  ) {}

  async create(data: {
    name: string;
    gender: string;
    address: string;
    profile_picture_url?: string;
    userId: number;
  }): Promise<Profile> {
    const exist = await this.profileRepo.findUserById(data.userId);
    if (exist) throw new Error("Profile sudah ada");

    return this.profileRepo.create(data);
  }

  async getById(id: number): Promise<Profile> {
    const profile = await this.profileRepo.findProfileById(id);
    if (!profile) throw new Error("Profile tidak ditemukan");

    return profile;
  }

  async update(id: number, data: Partial<Profile>): Promise<Profile> {
    await this.getById(id);
    return this.profileRepo.update(id, data);
  }

  async delete(id: number): Promise<void> {
    await this.getById(id);
    await this.profileRepo.remove(id);
  }
}
