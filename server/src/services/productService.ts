import prisma from "../configs/dbs";
import { createSlug } from "../utils/loashCover";
export async function generateUniquePoached(min: number, max: number) {
  let isUnique = false;
  let poachedString;

  while (!isUnique) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    // Chuyển số ngẫu nhiên thành chuỗi
    poachedString = randomNumber.toString();
    const existingRecord = await prisma.productSales.findFirst({
      where: { poached: poachedString },
    });
    if (!existingRecord) {
      isUnique = true;
    }
  }
  return poachedString;
}
enum RoleStatusService {
  cancel = "cancel",
  success = "success",
  ide = "ide",
  error = "error",
}
type ProductSale = {
  title: string;
  price: number;
  poached?: string;
};
export const createService = async (
  receiving: string,
  title: string,
  content: string,
  description: string,
  duplicate: boolean,
  reseller: boolean,
  categoryId: number,
  subCategoryId: number,
  productSales: [],
  image: string,
  userId: string
) => {
  const newService = await prisma.products.create({
    data: {
      receiving: receiving,
      title: title,
      content: content,
      image: image || null,
      slug: createSlug(title),
      userId: userId!,
      description: description,
      duplicate: duplicate,
      reseller: reseller,
      categoryId: categoryId || null,
      subCategoryId: subCategoryId || null,
      productSales: { createMany: { data: productSales } },
    },
  });
  return newService.id;
};
export const createAccountProductSale = async (
  account: string,
  password: string,
  productSaleId: number
) => {
  return await prisma.productAccount.create({
    data: { account, password, productSaleId },
    select: { id: true, productSales: { select: { id: true } } },
  });
};
export const deleteAccountProductSale = async (id: number, poached: string) => {
  return await prisma.productAccount.delete({
    where: { id, productSales: { poached } },
  });
};

export const findProductSaleByPoached = async (poached: string) => {
  return await prisma.productSales.findUnique({ where: { poached } });
};
export const createReview = async (
  level: number,
  content: string,
  userId: string,
  productId: number
) => {
  return prisma.productReviews.create({
    data: { level, content, userId, productId },
    select: {
      level: true,
      content: true,
      createdAt: true,
      userId: true,
      user: { select: { profiles: { select: { fullName: true } } } },
    },
  });
};
export const findByIdService = async (slug: string) => {
  try {
    const post = await prisma.products.findUnique({
      where: { slug: slug, status: "success" },
      include: {
        user: {
          select: {
            username: true,
            status: { select: { isOnline: true, lastOnline: true } },
          },
        },
        category: {
          select: {
            category: true,
          },
        },
        subCategory: {
          select: {
            subCategory: true,
          },
        },
        _count: { select: { productOrders: true } },
        productSales: {
          include: {
            _count: { select: { productAccount: { where: { sold: false } } } },
          },
        },
        productReviews: {
          select: {
            level: true,
            content: true,
            userId: true,
            createdAt: true,
            user: { select: { profiles: { select: { fullName: true } } } },
          },
        },
      },
    });
    return post;
  } catch (error) {
    console.error("Error findById post:", error);
    return null;
  }
};

export const findFirstService = async (title: string) => {
  return await prisma.products.findFirst({ where: { title } });
};

export const findAllServiceById = async (id: string) => {
  const products = await prisma.products.findMany({
    where: {
      category: { categoryCover: id },
      status: "success",
    },
    include: {
      user: { select: { username: true } },
      category: { select: { category: true } },
      subCategory: { select: { subCategory: true } },

      productSales: {
        include: {
          _count: { select: { productAccount: { where: { sold: false } } } },
        },
      },
      productReviews: {
        select: {
          level: true,
          content: true,
          createdAt: true,
          user: { select: { profiles: true } },
        },
      },

      _count: { select: { productOrders: true } },
    },
  });

  return products;
};
export const findSeed = async () => {
  const products = await prisma.products.findMany({
    where: { status: "success" },
    include: {
      user: { select: { username: true } },
      category: { select: { category: true, categoryCover: true } },
      subCategory: { select: { subCategory: true } },
      productSales: true,
      productReviews: {
        select: {
          level: true,
          content: true,
          createdAt: true,
          user: { select: { profiles: true } },
        },
      },
      _count: { select: { productOrders: true } },
    },
  });

  return products;
};
export const findAllServiceAllByAdmin = async () => {
  return await prisma.products.findMany({
    include: {
      user: { select: { username: true } },
      category: { select: { category: true } },
      subCategory: { select: { subCategory: true } },
    },
  });
};
export const findAllProductAllByAdmin = async () => {
  return await prisma.products.findMany({
    include: {
      user: { select: { username: true } },
      category: { select: { category: true } },
      subCategory: { select: { subCategory: true } },
    },
  });
};
export const findAllProduct = async () => {
  const products = await prisma.products.findMany({
    include: {
      user: { select: { username: true } },
      category: { select: { category: true } },
      subCategory: { select: { subCategory: true } },
      productReviews: {
        select: {
          level: true,
          content: true,
          createdAt: true,
          user: { select: { profiles: true } },
        },
      },
    },
  });

  return products;
};
export const findAllServiceByUser = async (userId: string) => {
  try {
    const post = await prisma.products.findMany({
      where: { userId },
      include: {
        category: {
          select: {
            category: true,
          },
        },
        subCategory: {
          select: {
            subCategory: true,
          },
        },
        _count: { select: { productOrders: true } },
        productSales: {
          include: { _count: { select: { productAccount: true } } },
        },
        productReviews: {
          select: {
            level: true,
            content: true,
            userId: true,
            createdAt: true,
            user: { select: { profiles: { select: { fullName: true } } } },
          },
        },
      },
    });
    return post;
  } catch (error) {
    console.error("Error findALL post:", error);
    return null;
  }
};
export const findAllProductSale = async (userId: string, slug: string) => {
  return await prisma.products.findUnique({
    where: { userId, slug },
    select: {
      title: true,
      productSales: {
        select: {
          title: true,
          price: true,
          poached: true,
          id: true,
          productAccount: {
            select: { id: true, account: true, password: true, sold: true },
          },
        },
      },
    },
  });
};

export const updateServiceById = async (
  id: number,
  title: string,
  content: string,
  image?: string,
  userId?: string,
  categoryId?: number,
  subCategoryId?: number
) => {
  const existingService = await prisma.products.findUnique({
    where: { id: id },
  });

  if (!existingService) {
    throw new Error(`Service with id ${id} not found`);
  }

  const updateService = await prisma.products.update({
    where: { id: id, userId: userId },
    data: {
      title,
      content,
      image: image ? image : existingService.image,
      slug: createSlug(title),
      categoryId: categoryId,
      subCategoryId: subCategoryId,
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
      category: {
        select: {
          category: true,
        },
      },
      subCategory: {
        select: {
          subCategory: true,
        },
      },
    },
  });
  return updateService;
};

// Delete a user by ID
export const deleteServiceById = async (id: number, userId: string) => {
  try {
    return await prisma.products.delete({ where: { id, userId } });
  } catch (error) {
    console.error("Error delete post:", error);
    return null;
  }
};

// Delete a user by ID
export const updatePostByAdmin = async (
  id: number,
  status: RoleStatusService
) => {
  try {
    return await prisma.products.update({
      where: { id },
      data: { status: status },
    });
  } catch (error) {
    console.error("Error delete post:", error);
    return null;
  }
};
