import prisma from "../configs/dbs";
import { createSlug } from "../utils/loashCover";
import { v4 as uuidv4 } from "uuid";
function generateShortUuid() {
  return uuidv4().slice(0, 6);
}
enum RoleService {
  service = "service",
  product = "product",
}
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
  poached: string,
  duplicate: boolean,
  reseller: boolean,
  serviceCategoryId: number,
  serviceSubCategoryId: number,
  serviceChildrenCategoryId: number,
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
      slug: createSlug(title),
      userId: userId!,
      description: description,
      poached: poached,
      duplicate: duplicate,
      reseller: reseller,
      serviceCategoryId: serviceCategoryId || null,
      serviceSubCategoryId: serviceSubCategoryId || null,
      serviceChildrenCategoryId: serviceChildrenCategoryId || null,
      serviceSales: { createMany: { data: serviceSales } },
    },
  });
  return newService.id;
};
export const createReview = async (
  level: number,
  content: string,
  userId: string,
  servicesId: number
) => {
  return prisma.serviceReviews.create({
    data: { level, content, userId, servicesId },
    select: {
      level: true,
      content: true,
      createdAt: true,
      user: { select: { profiles: { select: { fullName: true } } } },
    },
  });
};
export const findByIdService = async (slug: string) => {
  try {
    const post = await prisma.services.findUnique({
      where: { slug: slug, status: "success" },
      include: {
        user: {
          select: {
            username: true,
            status: { select: { isOnline: true, lastOnline: true } },
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
        _count: { select: { orders: true } },
        serviceSales: true,
        serviceReviews: {
          select: {
            level: true,
            content: true,
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

export const findAllServiceById = async (id: string) => {
  const services = await prisma.services.findMany({
    where: {
      serviceSubCategory: { subCategoryCover: id },
      status: "success",
    },
    include: {
      user: { select: { username: true } },
      serviceCategory: { select: { category: true } },
      serviceSubCategory: { select: { subCategory: true } },
      serviceChildrenCategory: { select: { childrenCategory: true } },
      serviceSales: true,
      serviceReviews: {
        select: {
          level: true,
          content: true,
          createdAt: true,
          user: { select: { profiles: true } },
        },
      },
      _count: { select: { orders: true } },
    },
  });

  return services;
};
export const findSeed = async () => {
  const services = await prisma.services.findMany({
    where: { status: "success" },
    include: {
      user: { select: { username: true } },
      serviceCategory: { select: { category: true } },
      serviceSubCategory: { select: { subCategoryCover: true } },
      serviceChildrenCategory: { select: { childrenCategory: true } },
      serviceSales: true,
      serviceReviews: {
        select: {
          level: true,
          content: true,
          createdAt: true,
          user: { select: { profiles: true } },
        },
      },
      _count: { select: { orders: true } },
    },
  });

  return services;
};
export const findAllServiceAllByAdmin = async () => {
  return await prisma.services.findMany({
    where: {
      serviceCategory: { category: RoleService.service },
    },
    include: {
      user: { select: { username: true } },
      serviceCategory: { select: { category: true } },
      serviceSubCategory: { select: { subCategory: true } },
      serviceChildrenCategory: { select: { childrenCategory: true } },
    },
  });
};
export const findAllProductAllByAdmin = async () => {
  return await prisma.services.findMany({
    where: {
      serviceCategory: { category: RoleService.product },
    },
    include: {
      user: { select: { username: true } },
      serviceCategory: { select: { category: true } },
      serviceSubCategory: { select: { subCategory: true } },
      serviceChildrenCategory: { select: { childrenCategory: true } },
    },
  });
};
export const findAllProduct = async () => {
  const products = await prisma.services.findMany({
    where: { serviceCategory: { category: RoleService.product } },
    include: {
      user: { select: { username: true } },
      serviceCategory: { select: { category: true } },
      serviceSubCategory: { select: { subCategory: true } },
      serviceReviews: {
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
        _count: { select: { orders: true } },
        serviceSales: true,
        serviceReviews: {
          select: {
            level: true,
            content: true,
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

// Delete a user by ID
export const updatePostByAdmin = async (
  id: number,
  status: RoleStatusService
) => {
  try {
    return await prisma.services.update({
      where: { id },
      data: { status: status },
    });
  } catch (error) {
    console.error("Error delete post:", error);
    return null;
  }
};
