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
  userId: string,
  serviceSalesId?: number,
  servicesId?: number
) => {
  const profile = await prisma.profiles.findUnique({
    where: { userId: userId },
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
          userId: userId,
          servicesId: servicesId,
          serviceSalesId: serviceSalesId,
        },
      });
      const updatedProfile = await prisma.profiles.update({
        where: { userId: userId },
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
  return await prisma.orders.findMany({
    include: {
      services: {
        select: {
          id: true,
          serviceCategory: true,
          serviceSubCategory: true,
          userId: true,
          user: { select: { username: true } },
        },
      },
      users: { select: { username: true } },
      serviceSales: true,
    },
  });
};
export const findByUserOrder = async (userId: string) => {
  return await prisma.orders.findMany({
    where: { userId: userId },
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
export const findByUserBuy = async (id: number, userId: string) => {
  return await prisma.orders.findFirst({
    where: { servicesId: id, userId: userId },
  });
};
export const updateConfirmCustomer = async (id: string, role: string) => {
  if (role === "CUSTOMER") {
    return await prisma.orders.update({
      where: {
        id,
      },
      data: { confirmSeller: true },
    });
  } else {
    return await prisma.orders.update({
      where: {
        id,
      },
      data: { buyerConfirm: true },
    });
  }
};
export const updateOrderByAdmin = async (
  id: string,
  status: Status,
  total: number,
  userId: string
) => {
  if (status === "success") {
    const profile = await prisma.profiles.findUnique({
      where: { userId: userId },
      select: { accountBalance: true },
    });
    if (profile && profile.accountBalance) {
      const order = await prisma.orders.update({
        where: {
          id,
        },
        data: { status: status },
      });
      const updatedProfile = await prisma.profiles.update({
        where: { userId: userId },
        data: {
          accountBalance: profile.accountBalance + total,
        },
        select: { accountBalance: true },
      });
      return { order, updatedProfile };
    }
  } else {
    return await prisma.orders.update({
      where: {
        id,
      },
      data: { status: status },
    });
  }
};
