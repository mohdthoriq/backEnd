import * as userRepo from "../repository/user.repository"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import config from "../utils/env"

export const register = async (data: {
  username: string
  email: string
  password: string
  role?: string
}) => {
  const existing = await userRepo.findByEmail(data.email)
  if (existing) {
    throw new Error("Email sudah terdaftar")
  }

  const hashedPassword = await bcrypt.hash(data.password, 10)

  return userRepo.create({
    username: data.username,
    email: data.email,
    password: hashedPassword,
    role: data.role || "USER"
  })
}

export const login = async (data: { email: string; password: string }) => {
  const user = await userRepo.findByEmail(data.email)
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
    { expiresIn: "1h" }
  )

  return { user, token }
}
