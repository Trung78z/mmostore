import prisma from "../configs/dbs";
import { createSlug } from "../utils/loashCover";
import { v4 as uuidv4 } from "uuid";
async function generateUniqueShortUuid() {
  let isUnique = false;
  let shortUuid;

  while (!isUnique) {
    shortUuid = uuidv4().slice(0, 6);
    const existingRecord = await prisma.orders.findUnique({
      where: { id: shortUuid },
    });

    if (!existingRecord) {
      isUnique = true;
    }
  }

  return shortUuid;
}
enum Check {
  product = "product",
  service = "service",
}
enum Status {
  create = "create",
  success = "success",
  refund = "refund",
  cancel = "cancel",
}
export const createOrder = async (
  amount: number,
  unitPrice: number,
  sale: number,
  total: number,
  refund: number,
  usersId: string,
  serviceSalesId?: number,
  servicesId?: number
) => {
  const profile = await prisma.profiles.findUnique({
    where: { userId: usersId },
    select: { accountBalance: true },
  });

  if (profile?.accountBalance && profile.accountBalance > total) {
    const idBem = await generateUniqueShortUuid();
    if (idBem) {
      const newService = await prisma.orders.create({
        data: {
          id: idBem,
          amount: amount,
          unitPrice: unitPrice,
          sale: sale,
          total: total,
          refund: refund,
          usersId: usersId,
          servicesId: servicesId,
          serviceSalesId: serviceSalesId,
        },
      });
      const updatedProfile = await prisma.profiles.update({
        where: { userId: usersId },
        data: {
          accountBalance: profile.accountBalance - total,
        },
        select: { accountBalance: true },
      });
      return { newService, updatedProfile };
    }
  }
};

export const updateOrder = async (id: string, status: Status) => {
  const idBem = await generateUniqueShortUuid();
  if (idBem) {
    const newService = await prisma.orders.update({
      where: { id },
      data: {
        status: status,
      },
    });
    return newService;
  }
};

enum RoleService {
  service = "service",
  product = "product",
}
export const findAllOrder = async () => {
  const newService = await prisma.orders.findMany({
    include: {
      services: {
        select: {
          id: true,
          serviceCategory: true,
          serviceSubCategory: true,
        },
      },
      serviceSales: true,
    },
  });
  return newService;
};
export const findByUserOrder = async (userId: string) => {
  return await prisma.orders.findMany({
    where: { usersId: userId },
    include: {
      services: {
        select: {
          id: true,
          serviceCategory: true,
          serviceSubCategory: true,
          user: { select: { username: true } },
        },
      },
      serviceSales: true,
    },
  });
};
export const findByUserSellOrder = async (
  userId: string,
  service: RoleService
) => {
  const newService = await prisma.orders.findMany({
    where: {
      services: {
        userId: userId,
        serviceCategory: { category: service },
      },
    },
    include: {
      services: {
        select: {
          id: true,
          serviceCategory: true,
          serviceSubCategory: true,
          user: { select: { username: true } },
        },
      },
      serviceSales: true,
    },
  });
  return newService;
};
