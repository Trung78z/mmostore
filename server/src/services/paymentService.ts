import prisma from "../configs/dbs";
import { v4 as uuidv4 } from "uuid";
async function generateUniqueShortUuid() {
  let isUnique = false;
  let shortUuid;

  while (!isUnique) {
    shortUuid = uuidv4().slice(0, 8);
    const existingRecord = await prisma.payments.findUnique({
      where: { id: shortUuid },
    });

    if (!existingRecord) {
      isUnique = true;
    }
  }

  return shortUuid;
}

export const createPayment = async (
  userId?: string,
  total?: number,
  image?: string
) => {
  const idBem = await generateUniqueShortUuid();
  if (idBem) {
    const newService = await prisma.payments.create({
      data: {
        id: idBem,
        total: total,
        image: image,
        usersId: userId,
      },
    });
    return { success: true, msg: newService };
  } else {
    return { success: false, msg: "Internal server error" };
  }
};

export const updatePayment = async (
  id: string,
  usersId: string,
  total?: number,
  image?: string
) => {
  const newService = await prisma.payments.update({
    where: { id, usersId },
    data: { total, image },
  });
  return newService;
};

export const updatePaymentByAdmin = async (
  id: string,
  userId: string,
  total: number
) => {
  const profile = await prisma.profiles.findUnique({
    where: { userId },
  });
  if (profile?.accountBalance) {
    return await prisma.profiles.update({
      where: { userId: userId },
      data: {
        accountBalance: profile.accountBalance + total,
        user: {
          update: {
            payments: {
              update: { where: { id: id }, data: { status: "success" } },
            },
          },
        },
      },
      select: {
        accountBalance: true,
        user: {
          select: {
            payments: {
              where: { id },
              select: { status: true },
            },
          },
        },
      },
    });
  }
};

export const updatePaymentByAdminSuccess = async (id: string) => {
  return await prisma.payments.update({
    where: { id },
    data: { status: "success" },
  });
};

export const findAllPaymentByUser = async (usersId: string) => {
  return await prisma.payments.findMany({
    where: { usersId, NOT: { total: null } },
  });
};

export const findALlPaymentByAdmin = async () => {
  return await prisma.payments.findMany({
    where: { NOT: { total: null } },
    include: {
      users: {
        select: { profiles: { select: { firstName: true, lastName: true } } },
      },
    },
  });
};

export const deletePaymentByAdmin = async (id: string) => {
  return await prisma.payments.update({
    where: { id },
    data: { status: "error" },
  });
};
