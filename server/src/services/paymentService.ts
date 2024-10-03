import prisma from "../configs/dbs";
import { v4 as uuidv4 } from "uuid";

enum RoleStatusService {
  cancel = "cancel",
  success = "success",
  ide = "ide",
  error = "error",
}

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

async function generateUniqueShortUuidWithdraw() {
  let isUnique = false;
  let shortUuid;
  while (!isUnique) {
    shortUuid = uuidv4().slice(0, 16);
    const existingRecord = await prisma.withdraws.findUnique({
      where: { id: shortUuid },
    });
    if (!existingRecord) {
      isUnique = true;
    }
  }
  return shortUuid;
}
interface RolePayment {
  success: "success";
  cancel: "cancel";
  ide: "ide";
  error: "error";
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
        userId: userId,
        status: "success",
      },
    });
    return { success: true, msg: newService };
  } else {
    return { success: false, msg: "Internal server error" };
  }
};

export const createWithdraw = async (
  total: number,
  banking: string,
  accountBank: string,
  description: string,
  userId: string
) => {
  const profile = await prisma.profiles.findUnique({
    where: { userId: userId },
    select: { accountBalance: true },
  });

  if (profile?.accountBalance && profile.accountBalance > total) {
    const idBem = await generateUniqueShortUuidWithdraw();
    if (idBem) {
      const draw = await prisma.withdraws.create({
        data: {
          id: idBem,
          total: total,
          banking: banking,
          accountBank: accountBank,
          description: description,
          userId: userId,
        },
      });
      const resProfile = await prisma.profiles.update({
        where: { userId: userId },
        data: {
          accountBalance: profile.accountBalance - total,
        },
        select: { accountBalance: true },
      });

      return { success: true, msg: draw, resProfile };
    } else {
      throw new Error("Internal server error");
    }
  } else {
    throw new Error("Internal server error");
  }
};

export const updateWithdrawByAdminStatus = async (
  id: string,
  status: RoleStatusService
) => {
  return await prisma.withdraws.update({
    where: { id: id },
    data: {
      status: status,
    },
  });
};

export const updatePayment = async (
  id: string,
  userId: string,
  total?: number,
  image?: string
) => {
  const newService = await prisma.payments.update({
    where: { id, userId },
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
export const updateWithdrawByAdmin = async (
  id: string,
  status: RoleStatusService
) => {
  return await prisma.withdraws.update({
    where: { id },
    data: { status: status },
  });
};

export const updatePaymentByAdminStatus = async (
  id: string,
  status: RoleStatusService
) => {
  return await prisma.payments.update({
    where: { id },
    data: { status: status },
  });
};

export const findAllWithDrawByUser = async (userId: string) => {
  return await prisma.withdraws.findMany({
    where: { userId },
    orderBy: { createdAt: "asc" },
  });
};
export const findAllWithDrawByAdmin = async () => {
  return await prisma.withdraws.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      users: {
        select: { profiles: { select: { fullName: true } } },
      },
    },
  });
};

export const findAllPaymentByUser = async (userId: string) => {
  return await prisma.payments.findMany({
    where: { userId, NOT: { total: null } },
    orderBy: { createdAt: "asc" },
  });
};

export const findALlPaymentByAdmin = async () => {
  return await prisma.payments.findMany({
    where: { NOT: { total: null } },
    include: {
      users: {
        select: { profiles: { select: { fullName: true } } },
      },
    },
    orderBy: { createdAt: "asc" },
  });
};
