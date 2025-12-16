import { getPrisma } from '../prisma';
import config from '../utils/env'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

const prisma = getPrisma()

export const register = async (data: {
    username: string;
    email: string;
    password: string;
    role?: string
}) => {
    const existingUser = await prisma.user.findUnique({ where: { email: data.email } })
    if (existingUser) {
        throw new Error("Email sudah terdaftar")
    }

    const hashedPassword = await bcrypt.hash(data.password, 10)

    return await prisma.user.create({
        data: {
            email: data.email,
            username: data.username,
            password: hashedPassword,
            role: data.role || "USER"
        },
    })
}

export const loginUser = async (data: { email: string; password: string }) => {
    const user = await prisma.user.findUnique({ where: { email: data.email } })
    if (!user) {
        throw new Error("Email atau password salah")
    }

    const isValid = await bcrypt.compare(data.password, user.password)
    if (!isValid) {
        throw new Error("Email atau password salah")
    }

    const token = jwt.sign(
        { id: user.id, role: user.role },
        config.JWT_SECRET,
        { expiresIn: '1h' }
    )

    return { user, token }
}