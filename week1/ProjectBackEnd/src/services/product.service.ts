import { getPrisma} from "../prisma"
import type { Product } from "../src/generated/prisma/client";

const prisma = getPrisma();

export const getAllProducts = async(): Promise<{ products: Product[], total: number }> => {
    const products = await prisma.product.findMany();
    const total = products.length;

    return { products, total };
}

export const getProductById = async(id: string): Promise<Product> => {
    const numId = parseInt(id);
    const product = await prisma.product.findUnique({
        where: {
            id: numId
        }
    });

    if (!product) {
        throw new Error("Product tidak ditemukan");
    }

    return product;
}

export const searchProducts = async(name?: string, max_price?: number, min_price?: number): Promise<Product[]> => {
    return await prisma.product.findMany({
    where: {
      ...(name && {
        name: {
          contains: name,
          mode: "insensitive"
        }
      }),
      ...(max_price !== undefined || min_price !== undefined
        ? {
            price: {
              ...(min_price !== undefined && { gte: min_price }),
              ...(max_price !== undefined && { lte: max_price })
            }
          }
        : {})
    }
  });
}

export const createProduct = async(data: {name:string, description?:string, price:number, stock:number}): Promise<Product> => {
    return await prisma.product.create({
        data: {
            name: data.name,
            description: data.description ?? null,
            price: data.price,
            stock: data.stock
        }
    })
}

export const updateProduct = async(id: string, data: Partial<Product>): Promise<Product> => {
   await getProductById(id);

    const numId = parseInt(id);

    return await prisma.product.update({
        where: {
            id: numId
        },
        data
    })
}

export const deleteProduct = async(id: string): Promise<Product> => {
    const numId = parseInt(id);
    return await prisma.product.delete({
        where: {
            id: numId
        }
    })

}