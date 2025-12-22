import type { Prisma, PrismaClient, OrderItem } from "../src/generated/prisma/client";
import type { IOrderItemRepository } from "../repository/order_items.repository";
import type { FindAllParams } from "./product.service";

export interface OrderItemListResponse {
  items: OrderItem[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export interface IOrderItemService {
  list(params: FindAllParams): Promise<OrderItemListResponse>;
  getById(id: number): Promise<OrderItem>;
  create(data: {
    orderId: number;
    productId: number;
    quantity: number;
  }): Promise<OrderItem>;
  update(
    id: number,
    data: { orderId: number; productId: number; quantity: number }
  ): Promise<OrderItem>;
  delete(id: number): Promise<void>;
}

export class OrderItemService implements IOrderItemService {
  constructor(
    private prisma: PrismaClient,
    private orderItemRepo: IOrderItemRepository
  ) {}

  async list(params: FindAllParams): Promise<OrderItemListResponse> {
    const { page, limit, search, sortBy, sortOrder } = params;

    const skip = (page - 1) * limit;

    const where: Prisma.OrderItemWhereInput = {};

    if (search?.name) {
      where.product = {
        name: {
          contains: search.name,
          mode: "insensitive",
        },
      };
    }

    const orderBy: Prisma.OrderItemOrderByWithRelationInput = sortBy
      ? { [sortBy]: sortOrder || "desc" }
      : { order: { createdAt: "desc" } };

    const { items, total } = await this.orderItemRepo.findAll({
      skip,
      take: limit,
      where,
      orderBy,
    });

    return {
      items,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    };
  }

  async getById(id: number): Promise<OrderItem> {
    const item = await this.orderItemRepo.findById(id);
    if (!item) throw new Error("Order item tidak ditemukan");
    return item;
  }

  async create(data: {
    orderId: number;
    productId: number;
    quantity: number;
  }): Promise<OrderItem> {
    const order = await this.prisma.order.findUnique({
      where: { id: data.orderId },
    });
    if (!order) throw new Error("Order tidak ditemukan");

    const product = await this.prisma.product.findUnique({
      where: { id: data.productId },
    });
    if (!product) throw new Error("Product tidak ditemukan");

    return this.orderItemRepo.create({
      orderId: data.orderId,
      productId: data.productId,
      quantity: data.quantity,
      priceAtTime: product.price,
    });
  }

  async update(
    id: number,
    data: { orderId: number; productId: number; quantity: number }
  ): Promise<OrderItem> {
    const exist = await this.orderItemRepo.findRawById(id);
    if (!exist) throw new Error("Order item tidak ditemukan");

    return this.orderItemRepo.update(id, data);
  }

  async delete(id: number): Promise<void> {
    const exist = await this.orderItemRepo.findRawById(id);
    if (!exist) throw new Error("Order item tidak ditemukan");

    await this.orderItemRepo.remove(id);
  }
}
