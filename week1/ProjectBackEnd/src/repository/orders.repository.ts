import type { Prisma, Order, PrismaClient } from "../src/generated/prisma/client";

export interface FindAllOrderParams {
  page: number;
  limit: number;
  search?: {
    userId?: number;
    status?: string;
  };
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface IOrderRepository {
  checkout(
    userId: number,
    items: { productId: number; quantity: number; priceAtTime: number }[],
    total: number,
    tx: Prisma.TransactionClient
  ): Promise<Order>;

  findById(id: number): Promise<Order | null>;

  findAll(params: FindAllOrderParams): Promise<{
    orders: Order[];
    total: number;
  }>;

  create(
    userId: number,
    total: number,
    items: {
      productId: number;
      quantity: number;
      priceAtTime: Prisma.Decimal;
    }[]
  ): Promise<Order>;

  update(
    id: number,
    total: number,
    items: {
      productId: number;
      quantity: number;
      priceAtTime: Prisma.Decimal;
    }[]
  ): Promise<Order>;

  remove(id: number): Promise<Order>;
}

export class OrderRepository implements IOrderRepository {
  constructor(private prisma: PrismaClient) {}

  async checkout(
    userId: number,
    items: { productId: number; quantity: number; priceAtTime: number }[],
    total: number,
    tx: Prisma.TransactionClient
  ): Promise<Order> {
    return tx.order.create({
      data: {
        userId,
        total,
        items: {
          create: items.map(item => ({
            product_id: item.productId,
            quantity: item.quantity,
            priceAtTime: item.priceAtTime
          }))
        }
      },
      include: {
        user: {
          select: { id: true, username: true }
        },
        items: {
          include: { product: true }
        }
      }
    });
  }

  async findById(id: number): Promise<Order | null> {
    return this.prisma.order.findUnique({
      where: { id },
      include: {
        user: {
          select: { id: true, username: true }
        },
        items: {
          include: { product: true }
        }
      }
    });
  }

  async findAll(params: FindAllOrderParams): Promise<{ orders: Order[]; total: number }> {
    const { page, limit, search, sortBy, sortOrder } = params;

    const skip = (page - 1) * limit;

    const whereClause: Prisma.OrderWhereInput = {};

    if (search?.userId) {
      whereClause.userId = search.userId;
    }

    const orderBy: Prisma.OrderOrderByWithRelationInput = sortBy
      ? { [sortBy]: sortOrder || "desc" }
      : { createdAt: "desc" };

    const orders = await this.prisma.order.findMany({
      skip,
      take: limit,
      where: whereClause,
      orderBy,
      include: {
        items: {
          include: { product: true }
        }
      }
    });

    const total = await this.prisma.order.count({ where: whereClause });

    return { orders, total };
  }

  async create(
    userId: number,
    total: number,
    items: {
      productId: number;
      quantity: number;
      priceAtTime: Prisma.Decimal;
    }[]
  ): Promise<Order> {
    return this.prisma.order.create({
      data: {
        userId,
        total,
        items: {
          create: items.map(item => ({
            quantity: item.quantity,
            priceAtTime: item.priceAtTime,
            product: {
              connect: { id: item.productId }
            }
          }))
        }
      },
      include: {
        items: {
          include: { product: true }
        }
      }
    });
  }

  async update(
    id: number,
    total: number,
    items: {
      productId: number;
      quantity: number;
      priceAtTime: Prisma.Decimal;
    }[]
  ): Promise<Order> {
    await this.prisma.orderItem.deleteMany({
      where: { order_id: id }
    });

    return this.prisma.order.update({
      where: { id },
      data: {
        total,
        items: {
          create: items.map(item => ({
            product_id: item.productId,
            quantity: item.quantity,
            priceAtTime: item.priceAtTime
          }))
        }
      },
      include: {
        items: {
          include: { product: true }
        }
      }
    });
  }

  async remove(id: number): Promise<Order> {
    await this.prisma.orderItem.deleteMany({
      where: { order_id: id }
    });

    return this.prisma.order.delete({
      where: { id }
    });
  }
}
