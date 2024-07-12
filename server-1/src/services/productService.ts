import prisma from "../configs/dbs";
import { createSlug } from "../utils/loashCover";

export const createProduct = async (
  title: string,
  content: string,
  image?: string,
  userId?: string,
  productCategoryId?: number,
  productSubCategoryId?: number
) => {
  try {
    const newProduct = await prisma.products.create({
      data: {
        title: title,
        content: content,
        image: image || null,
        slug: createSlug(title),
        userId: userId!,
        productCategoryId: productCategoryId || null,
        productSubCategoryId: productSubCategoryId || null,
      },
    });
    return newProduct.id;
  } catch (error) {
    console.error("Error creating post:", error);
    return null;
  }
};

export const findByIdProduct = async (slug: string) => {
  try {
    const post = await prisma.products.findUnique({
      where: { slug },
      include: {
        user: {
          select: {
            username: true,
          },
        },
        productCategory: {
          select: {
            category: true,
          },
        },
        productSubCategory: {
          select: {
            subCategory: true,
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
export const findAllProduct = async () => {
  try {
    const post = await prisma.products.findMany({
      include: {
        user: {
          select: {
            username: true,
          },
        },
        productCategory: {
          select: {
            category: true,
          },
        },
        productSubCategory: {
          select: {
            subCategory: true,
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

export const findAllProductByUser = async (userId: string) => {
  try {
    const post = await prisma.products.findMany({
      where: { userId },
      include: {
        user: {
          select: {
            username: true,
          },
        },
        productCategory: {
          select: {
            category: true,
          },
        },
        productSubCategory: {
          select: {
            subCategory: true,
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

export const updateProductById = async (
  id: number,
  title: string,
  content: string,
  image?: string,
  userId?: string,
  productCategoryId?: number,
  productSubCategoryId?: number
) => {
  const existingProduct = await prisma.products.findUnique({
    where: { id: id },
  });

  if (!existingProduct) {
    throw new Error(`Product with id ${id} not found`);
  }

  const updateProduct = await prisma.products.update({
    where: { id: id, userId: userId },
    data: {
      title,
      content,
      image: image ? image : existingProduct.image,
      slug: createSlug(title),
      productCategoryId: productCategoryId,
      productSubCategoryId: productSubCategoryId,
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
      productCategory: {
        select: {
          category: true,
        },
      },
      productSubCategory: {
        select: {
          subCategory: true,
        },
      },
    },
  });
  return updateProduct;
};

// Delete a user by ID
export const deleteProductById = async (id: number, userId: string) => {
  try {
    return await prisma.products.delete({ where: { id, userId } });
  } catch (error) {
    console.error("Error delete post:", error);
    return null;
  }
};
