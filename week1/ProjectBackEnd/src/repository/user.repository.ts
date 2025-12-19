import { getPrisma } from "../prisma"

const prisma = getPrisma()

export const findByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: { email }
  })
}

export const findById = async (id: number) => {
  return prisma.user.findUnique({
    where: { id }
  })
}

export const create = async (data: {
  username: string
  email: string
  password: string
  role?: string
}) => {
  return prisma.user.create({
    data
  })
}
