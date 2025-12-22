// services/user.service.ts
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../utils/env";
export class UserService {
    userRepo;
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async register(data) {
        const existing = await this.userRepo.findByEmail(data.email);
        if (existing) {
            throw new Error("Email sudah terdaftar");
        }
        const hashedPassword = await bcrypt.hash(data.password, 10);
        return this.userRepo.create({
            username: data.username,
            email: data.email,
            password: hashedPassword,
            role: data.role || "USER",
        });
    }
    async login(data) {
        const user = await this.userRepo.findByEmail(data.email);
        if (!user) {
            throw new Error("Email atau password salah");
        }
        const isValid = await bcrypt.compare(data.password, user.password);
        if (!isValid) {
            throw new Error("Email atau password salah");
        }
        const token = jwt.sign({ id: user.id, role: user.role }, config.JWT_SECRET, { expiresIn: "1h" });
        return { user, token };
    }
}
//# sourceMappingURL=user.service.js.map