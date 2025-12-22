import type { IUserRepository } from "../repository/user.repository";
export declare class UserService {
    private userRepo;
    constructor(userRepo: IUserRepository);
    register(data: {
        username: string;
        email: string;
        password: string;
        role?: string;
    }): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        username: string;
        email: string;
        password: string;
        role: string;
    }>;
    login(data: {
        email: string;
        password: string;
    }): Promise<{
        user: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            username: string;
            email: string;
            password: string;
            role: string;
        };
        token: string;
    }>;
}
//# sourceMappingURL=user.service.d.ts.map