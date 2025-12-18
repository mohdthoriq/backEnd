import { getPrisma } from "../prisma";
const prisma = getPrisma();
export const getAllProducts = async (params) => {
    const { page, limit, search, sortBy, sortOrder } = params;
    const skip = (page - 1) * limit;
    const whereClause = {
        deletedAt: null
    };
    if (search?.name) {
        whereClause.name = { contains: search.name, mode: "insensitive" };
    }
    if (search?.min_price) {
        whereClause.max_price = { lte: search.max_price };
    }
    if (search?.max_price) {
        whereClause.min_price = { gte: search.min_price };
    }
    const products = await prisma.product.findMany({
        skip: skip,
        take: limit,
        where: whereClause,
        orderBy: sortBy ? { [sortBy]: sortOrder || 'desc' } : { createdAt: 'desc' },
        include: {
            category: true
        }
    });
    const total = await prisma.product.count({
        where: whereClause
    });
    return { products, total, totalPages: Math.ceil(total / limit), currentPage: page };
};
export const getProductById = async (id) => {
    const numId = parseInt(id);
    const product = await prisma.product.findUnique({
        where: {
            id: numId,
            deletedAt: null
        },
        include: {
            category: true
        }
    });
    if (!product) {
        throw new Error("Product tidak ditemukan");
    }
    return product;
};
// export const searchProducts = async (name?: string, max_price?: number, min_price?: number): Promise<Product[]> => {
//     return await prisma.product.findMany({
//         where: {
//             ...(name && {
//                 name: {
//                     contains: name,
//                     mode: "insensitive"
//                 }
//             }),
//             price: {
//                 ...(min_price !== undefined && { gte: min_price }),
//                 ...(max_price !== undefined && { lte: max_price })
//             },
//             deletedAt: null
//         },
//         include: {
//             category: true
//         }
//     });
// }
export const createProduct = async (data) => {
    return await prisma.product.create({
        data: {
            name: data.name,
            description: data.description ?? null,
            price: data.price,
            stock: data.stock,
            categoryId: data.categoryId ?? null,
            image: data.image
        }
    });
};
export const updateProduct = async (id, data) => {
    await getProductById(id);
    const numId = parseInt(id);
    return await prisma.product.update({
        where: {
            id: numId,
            deletedAt: null
        },
        data
    });
};
export const deleteProduct = async (id) => {
    const numId = parseInt(id);
    return await prisma.product.update({
        where: {
            id: numId,
            deletedAt: null
        },
        data: {
            deletedAt: new Date()
        }
    });
};
//# sourceMappingURL=product.service.js.map