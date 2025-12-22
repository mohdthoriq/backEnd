import type { IOrderRepository } from "../repository/orders.repository";
import type { Order, PrismaClient } from "../src/generated/prisma/client";

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

export interface OrderListResponse {
  orders: Order[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export interface IOrderService {
  checkout(
    userId: number,
    items: { productId: number; quantity: number }[]
  ): Promise<Order>;

  getById(id: number): Promise<Order>;

  list(params: FindAllOrderParams): Promise<OrderListResponse>;

  create(data: {
    userId: number;
    items: { productId: number; quantity: number }[];
  }): Promise<Order>;

  update(
    id: number,
    items: { productId: number; quantity: number }[]
  ): Promise<Order>;

  delete(id: number): Promise<Order>;
}

export class OrderService implements IOrderService {
  constructor(
    private prisma: PrismaClient,
    private orderRepo: IOrderRepository
  ) {}

  async checkout(
    userId: number,
    items: { productId: number; quantity: number }[]
  ): Promise<Order> {
    if (!items.length) {
      throw new Error("Items tidak boleh kosong");
    }

    return this.prisma.$transaction(async (tx) => {
      let total = 0;

      const orderItemsData: {
        productId: number;
        quantity: number;
        priceAtTime: number;
      }[] = [];

      for (const item of items) {
        const product = await tx.product.findUnique({
          where: { id: item.productId }
        });

        if (!product) {
          throw new Error(`Product ID ${item.productId} not found`);
        }

        if (product.stock < item.quantity) {
          throw new Error(`Stock product ${product.name} tidak cukup`);
        }

        const price = Number(product.price);
        total += price * item.quantity;

        orderItemsData.push({
          productId: product.id,
          quantity: item.quantity,
          priceAtTime: price
        });

        await tx.product.update({
          where: { id: product.id },
          data: { stock: { decrement: item.quantity } }
        });
      }

      return this.orderRepo.checkout(
        userId,
        orderItemsData,
        total,
        tx
      );
    });
  }

  async getById(id: number): Promise<Order> {
    if (!id || isNaN(id)) {
      throw new Error("Invalid order ID");
    }

    const order = await this.orderRepo.findById(id);

    if (!order) {
      throw new Error("Order tidak ditemukan");
    }

    return order;
  }

  async list(params: FindAllOrderParams): Promise<OrderListResponse> {
    const { page, limit } = params;

    if (!page || page < 1) throw new Error("Page tidak valid");
    if (!limit || limit < 1) throw new Error("Limit tidak valid");

    const { orders, total } = await this.orderRepo.findAll(params);

    return {
      orders,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    };
  }

  async create(data: {
    userId: number;
    items: { productId: number; quantity: number }[];
  }): Promise<Order> {
    const user = await this.prisma.user.findUnique({
      where: { id: data.userId }
    });

    if (!user) throw new Error("User tidak ditemukan");

    let total = 0;

    const itemsWithPrice = await Promise.all(
      data.items.map(async (item) => {
        const product = await this.prisma.product.findUnique({
          where: { id: item.productId }
        });

        if (!product) {
          throw new Error(`Product ID ${item.productId} tidak ditemukan`);
        }

        total += Number(product.price) * item.quantity;

        return {
          productId: product.id,
          quantity: item.quantity,
          priceAtTime: product.price
        };
      })
    );

    return this.orderRepo.create(
      data.userId,
      total,
      itemsWithPrice
    );
  }

  async update(
    id: number,
    items: { productId: number; quantity: number }[]
  ): Promise<Order> {
    if (!items.length) {
      throw new Error("Items tidak boleh kosong");
    }

    let total = 0;

    const orderItems = [];

    for (const item of items) {
      const product = await this.prisma.product.findUnique({
        where: { id: item.productId }
      });

      if (!product) {
        throw new Error(`Product ID ${item.productId} tidak ditemukan`);
      }

      if (product.stock < item.quantity) {
        throw new Error(`Stock ${product.name} tidak cukup`);
      }

      total += Number(product.price) * item.quantity;

      orderItems.push({
        productId: product.id,
        quantity: item.quantity,
        priceAtTime: product.price
      });
    }

    return this.orderRepo.update(id, total, orderItems);
  }

  async delete(id: number): Promise<Order> {
    if (!id || isNaN(id)) {
      throw new Error("ID order tidak valid");
    }

    const order = await this.orderRepo.findById(id);
    if (!order) {
      throw new Error("Order tidak ditemukan");
    }

    return this.orderRepo.remove(id);
  }
}
