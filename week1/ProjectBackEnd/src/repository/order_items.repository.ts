import type {
  Prisma,
  PrismaClient,
  OrderItem
} from "../src/generated/prisma/client";

export interface IOrderItemRepository {
  findAll(params: {
    skip: number;
    take: number;
    where: Prisma.OrderItemWhereInput;
    orderBy: Prisma.OrderItemOrderByWithRelationInput;
  }): Promise<{ items: OrderItem[]; total: number }>;

  findById(id: number): Promise<OrderItem | null>;

  findRawById(id: number): Promise<OrderItem | null>;

  create(data: {
    orderId: number;
    productId: number;
    quantity: number;
    priceAtTime: Prisma.Decimal;
  }): Promise<OrderItem>;

  update(
    id: number,
    data: {
      orderId: number;
      productId: number;
      quantity: number;
    }
  ): Promise<OrderItem>;

  remove(id: number): Promise<OrderItem>;
}

export class OrderItemRepository implements IOrderItemRepository {
  constructor(private prisma: PrismaClient) {}

  async findAll(params: {
    skip: number;
    take: number;
    where: Prisma.OrderItemWhereInput;
    orderBy: Prisma.OrderItemOrderByWithRelationInput;
  }) {
    const { skip, take, where, orderBy } = params;

    const items = await this.prisma.orderItem.findMany({
      skip,
      take,
      where,
      orderBy,
      include: {
        order: true,
        product: true,
      },
    });

    const total = await this.prisma.orderItem.count({ where });

    return { items, total };
  }

  async findById(id: number) {
    return this.prisma.orderItem.findUnique({
      where: { id },
      include: {
        order: true,
        product: true,
      },
    });
  }

  async findRawById(id: number) {
    return this.prisma.orderItem.findUnique({
      where: { id },
    });
  }

  async create(data: {
    orderId: number;
    productId: number;
    quantity: number;
    priceAtTime: Prisma.Decimal;
  }) {
    return this.prisma.orderItem.create({
      data: {
        order_id: data.orderId,
        product_id: data.productId,
        quantity: data.quantity,
        priceAtTime: data.priceAtTime,
      },
      include: {
        order: true,
        product: true,
      },
    });
  }

  async update(
    id: number,
    data: {
      orderId: number;
      productId: number;
      quantity: number;
    }
  ) {
    return this.prisma.orderItem.update({
      where: { id },
      data: {
        order_id: data.orderId,
        product_id: data.productId,
        quantity: data.quantity,
      },
      include: {
        order: true,
        product: true,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.orderItem.delete({
      where: { id },
    });
  }
}
