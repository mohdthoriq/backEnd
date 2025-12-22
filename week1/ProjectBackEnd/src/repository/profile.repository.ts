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

export class ProfileRepository implements IProfileRepository {
  constructor(private prisma: PrismaClient) {}

  async findUserById(userId: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id: userId },
    });
  }

  async findProfileById(id: number): Promise<Profile | null> {
    return this.prisma.profile.findUnique({
      where: { id },
    });
  }

  async create(data: {
    name: string;
    gender: string;
    address: string;
    profile_picture_url?: string;
    userId: number;
  }): Promise<Profile> {
    return this.prisma.profile.create({
      data,
    });
  }

  async update(
    id: number,
    data: Prisma.ProfileUpdateInput
  ): Promise<Profile> {
    return this.prisma.profile.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<Profile> {
    return this.prisma.profile.delete({
      where: { id },
    });
  }
}
