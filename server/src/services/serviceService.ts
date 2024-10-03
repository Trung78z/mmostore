import prisma from "../configs/dbs";
import { createSlug } from "../utils/loashCover";
enum RoleStatusService {
  cancel = "cancel",
  success = "success",
  ide = "ide",
  error = "error",
}

export const createService = async (
  receiving: string,
  title: string,
  content: string,
  description: string,
  reseller: boolean,
  categoryId: number,
  subCategoryId: number,
  serviceSales: [],
  image: string,
  userId: string
) => {
  const newService = await prisma.services.create({
    data: {
      receiving: receiving,
      title: title,
      content: content,
      image: image || null,
      status: "success",
      slug: createSlug(title),
      userId: userId!,
      description: description,
      reseller: reseller,
      categoryId: categoryId || null,
      subCategoryId: subCategoryId || null,
      serviceSales: { createMany: { data: serviceSales } },
    },
  });
  return newService.id;
};
export const createReview = async (
  level: number,
  content: string,
  userId: string,
  serviceId: number
) => {
  return prisma.serviceReviews.create({
    data: { level, content, userId, serviceId },
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
  return await prisma.services.findUnique({
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
      _count: { select: { serviceOrders: true } },
      serviceSales: true,
      serviceReviews: {
        select: {
          level: true,
          content: true,
          createdAt: true,
          userId: true,
          user: { select: { profiles: { select: { fullName: true } } } },
        },
      },
    },
  });
};
export const findAllServiceReviewBySale = async () => {
  return await prisma.services.findMany({
    select: {
      serviceReviews: {
        include: { services: { include: { subCategory: true } } },
      },
    },
  });
};
export const findAllServiceById = async (id: string) => {
  return await prisma.services.findMany({
    where: {
      category: { categoryCover: id },
      status: "success",
    },
    select: {
      id: true,
      title: true,
      content: true,
      image: true,
      slug: true,
      status: true,
      reseller: true,
      sponsor: true,
      userId: true,
      receiving: true,
      categoryId: true,
      subCategoryId: true,

      user: { select: { username: true } },
      category: { select: { category: true } },
      subCategory: { select: { subCategory: true } },
      serviceSales: true,
      serviceReviews: {
        select: {
          level: true,
          content: true,
          createdAt: true,
          user: { select: { profiles: true } },
        },
      },
      _count: { select: { serviceOrders: true } },
    },
  });
};
export const findSeed = async () => {
  return await prisma.services.findMany({
    where: { status: "success" },
    include: {
      user: { select: { username: true } },
      category: { select: { category: true, categoryCover: true } },
      subCategory: { select: { subCategory: true } },
      serviceSales: true,
      serviceReviews: {
        select: {
          level: true,
          content: true,
          createdAt: true,
          user: { select: { profiles: true } },
        },
      },
      _count: { select: { serviceOrders: true } },
    },
  });
};
export const findAllByAdmin = async () => {
  return await prisma.services.findMany({
    include: {
      user: { select: { username: true } },
      category: { select: { category: true } },
      subCategory: { select: { subCategory: true } },
    },
  });
};

export const findAllServiceByUser = async (userId: string) => {
  return await prisma.services.findMany({
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
      _count: { select: { serviceOrders: true } },
      serviceSales: true,
      serviceReviews: {
        select: {
          level: true,
          content: true,
          createdAt: true,
          userId: true,
          user: { select: { profiles: { select: { fullName: true } } } },
        },
      },
    },
  });
};
export const findFirstService = async (title: string) => {
  return prisma.services.findFirst({ where: { title: title } });
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
  return await prisma.services.delete({ where: { id, userId } });
};

export const updatePostByAdmin = async (
  id: number,
  status: RoleStatusService
) => {
  return await prisma.services.update({
    where: { id },
    data: { status: status },
  });
};
