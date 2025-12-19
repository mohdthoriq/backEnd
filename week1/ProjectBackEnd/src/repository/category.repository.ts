import { getPrisma } from "../prisma";
import type { Prisma } from "../src/generated/prisma/client";

const prisma = getPrisma()

export async function list(
    skip: number, take: number, 
    where: Prisma.CategoryWhereInput, 
    orderBy: Prisma.CategoryOrderByWithRelationInput
) {
    return await prisma.category.findMany({
        skip,
        take,
        where,
        orderBy,
        include: {
            products: true
        }
    })
}

export async function countAll(where: Prisma.CategoryWhereInput) {
    return await prisma.category.count({
        where
    })
}

export async function findById(id:  number) {
    return await prisma.category.findUnique({
        where: {
            id,
            deletedAt: null
        }
    })
}

export async function findByName(name: string) {
  return prisma.category.findUnique({
    where: {
      name,
      deletedAt: null
    }
  })
}


export async function create(data: Prisma.CategoryCreateInput) {
    return await prisma.category.create({
        data
    })
}

export async function update(id: number, data: Prisma.CategoryUpdateInput) {
    return await prisma.category.update({
        where: {
            id,
            deletedAt: null
        },
        data
    })
}

export async function softDelete(id: number){
    return await prisma.category.update({
        where: {
            id,
            deletedAt: null
        },
        data: {
            deletedAt: new Date()
        }
    })
}