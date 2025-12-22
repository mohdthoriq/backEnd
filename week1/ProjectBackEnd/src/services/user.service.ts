// services/user.service.ts
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../utils/env";
import type { IUserRepository } from "../repository/user.repository";

export class UserService {
  constructor(private userRepo: IUserRepository) {}

  async register(data: {
    username: string;
    email: string;
    password: string;
    role?: string;
  }) {
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

  async login(data: { email: string; password: string }) {
    const user = await this.userRepo.findByEmail(data.email);
    if (!user) {
      throw new Error("Email atau password salah");
    }

    const isValid = await bcrypt.compare(data.password, user.password);
    if (!isValid) {
      throw new Error("Email atau password salah");
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      config.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return { user, token };
  }
}
