import { users } from "../models/user.model";

export const loginUser = (username: string, password: string) => {
    const user = users.find(u => u.username === username && u.password === password);

    if (!user || user.password !== password) {
        throw new Error("Username atau password salah");
    }

    return user;
}