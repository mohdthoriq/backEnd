import type { PrismaClient, User } from "../src/generated/prisma/client";

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(id: number): Promise<User | null>;
  create(data: {
    username: string;
    email: string;
    password: string;
    role?: string;
  }): Promise<User>;
}

export class UserRepository implements IUserRepository {
  constructor(private prisma: PrismaClient) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async create(data: {
    username: string;
    email: string;
    password: string;
    role?: string;
  }): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }
}
