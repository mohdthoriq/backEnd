import type { Prisma, Category, PrismaClient } from "../src/generated/prisma/client";
import type { Decimal } from "../src/generated/prisma/internal/prismaNamespace";

export interface ICategoryRepository {
  list(
    skip: number,
    take: number,
    where: Prisma.CategoryWhereInput,
    orderBy: Prisma.CategoryOrderByWithRelationInput
  ): Promise<Category[]>;
  countAll(where: Prisma.CategoryWhereInput): Promise<number>;
  findById(id: number): Promise<Category | null>;
  findByName(name: string): Promise<Category | null>;
  create(data: Prisma.CategoryCreateInput): Promise<Category>;
  update(id: number, data: Prisma.CategoryUpdateInput): Promise<Category>;
  softDelete(id: number): Promise<Category>;
  getCategoryProductStats(): Promise<{
    id: number;
    name: string;
    products: {
      price: Decimal;
      stock: number;
    }[];
  }[]>;
}

export class CategoryRepository implements ICategoryRepository {
  constructor(private prisma: PrismaClient) { }

  async list(
    skip: number,
    take: number,
    where: Prisma.CategoryWhereInput,
    orderBy: Prisma.CategoryOrderByWithRelationInput
  ): Promise<Category[]> {
    return this.prisma.category.findMany({
      skip,
      take,
      where,
      orderBy,
      include: {
        products: true
      }
    });
  }

  async countAll(where: Prisma.CategoryWhereInput): Promise<number> {
    return this.prisma.category.count({ where });
  }

  async findById(id: number): Promise<Category | null> {
    return this.prisma.category.findUnique({
      where: {
        id,
        deletedAt: null
      }
    });
  }

  async findByName(name: string): Promise<Category | null> {
    return this.prisma.category.findUnique({
      where: {
        name,
        deletedAt: null
      }
    });
  }

  async create(data: Prisma.CategoryCreateInput): Promise<Category> {
    return this.prisma.category.create({ data });
  }

  async update(
    id: number,
    data: Prisma.CategoryUpdateInput
  ): Promise<Category> {
    return this.prisma.category.update({
      where: {
        id,
        deletedAt: null
      },
      data
    });
  }

  async softDelete(id: number): Promise<Category> {
    return this.prisma.category.update({
      where: {
        id,
        deletedAt: null
      },
      data: {
        deletedAt: new Date()
      }
    });
  }

  async getCategoryProductStats() {
    return this.prisma.category.findMany({
      where: { deletedAt: null },
      select: {
        id: true,
        name: true,
        products: {
          where: { deletedAt: null },
          select: {
            price: true,
            stock: true
          }
        }
      }
    })
  }
}

