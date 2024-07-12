import prisma from "../configs/dbs";
import { createSlug } from "../utils/loashCover";
import { v4 as uuidv4 } from "uuid";
function generateShortUuid() {
  return uuidv4().slice(0, 6);
}
export const createService = async (
  title: string,
  content: string,
  image?: string,
  userId?: string,
  serviceCategoryId?: number,
  serviceSubCategoryId?: number
) => {
  try {
    const newService = await prisma.services.create({
      data: {
        title: title,
        content: content,
        image: image || null,
        slug: createSlug(title),
        userId: userId!,
        serviceCategoryId: serviceCategoryId || null,
        serviceSubCategoryId: serviceSubCategoryId || null,
      },
    });
    return newService.id;
  } catch (error) {
    console.error("Error creating post:", error);
    return null;
  }
};

export const findByIdService = async (slug: string) => {
  try {
    const post = await prisma.services.findUnique({
      where: { slug },
      include: {
        user: {
          select: {
            username: true,
          },
        },
        serviceCategory: {
          select: {
            category: true,
          },
        },
        serviceSubCategory: {
          select: {
            subCategory: true,
          },
        },
        serviceSales: true,
      },
    });
    return post;
  } catch (error) {
    console.error("Error findById post:", error);
    return null;
  }
};
export const findAllService = async () => {
  try {
    const post = await prisma.services.findMany({
      include: {
        user: {
          select: {
            username: true,
          },
        },
        serviceCategory: {
          select: {
            category: true,
          },
        },
        serviceSubCategory: {
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

export const findAllServiceByUser = async (userId: string) => {
  try {
    const post = await prisma.services.findMany({
      where: { userId },
      include: {
        serviceCategory: {
          select: {
            category: true,
          },
        },
        serviceSubCategory: {
          select: {
            subCategory: true,
          },
        },
        serviceSales: true,
      },
    });
    return post;
  } catch (error) {
    console.error("Error findALL post:", error);
    return null;
  }
};

export const updateServiceById = async (
  id: number,
  title: string,
  content: string,
  image?: string,
  userId?: string,
  serviceCategoryId?: number,
  serviceSubCategoryId?: number
) => {
  const existingService = await prisma.services.findUnique({
    where: { id: id },
  });

  if (!existingService) {
    throw new Error(`Service with id ${id} not found`);
  }

  const updateService = await prisma.services.update({
    where: { id: id, userId: userId },
    data: {
      title,
      content,
      image: image ? image : existingService.image,
      slug: createSlug(title),
      serviceCategoryId: serviceCategoryId,
      serviceSubCategoryId: serviceSubCategoryId,
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
      serviceCategory: {
        select: {
          category: true,
        },
      },
      serviceSubCategory: {
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
    return await prisma.services.delete({ where: { id, userId } });
  } catch (error) {
    console.error("Error delete post:", error);
    return null;
  }
};
