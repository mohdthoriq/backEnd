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
export declare class UserRepository implements IUserRepository {
    private prisma;
    constructor(prisma: PrismaClient);
    findByEmail(email: string): Promise<User | null>;
    findById(id: number): Promise<User | null>;
    create(data: {
        username: string;
        email: string;
        password: string;
        role?: string;
    }): Promise<User>;
}
//# sourceMappingURL=user.repository.d.ts.map