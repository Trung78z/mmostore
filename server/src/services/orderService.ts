import prisma from "../configs/dbs";
import { v4 as uuidv4 } from "uuid";
async function generateUniqueShortUuid() {
  let isUnique = false;
  let shortUuid;

  while (!isUnique) {
    shortUuid = uuidv4().slice(0, 6);
    const existingRecord = await prisma.productOrders.findUnique({
      where: { id: shortUuid },
    });

    if (!existingRecord) {
      isUnique = true;
    }
  }

  return shortUuid;
}
enum Status {
  create = "create",
  success = "success",
  refund = "refund",
  cancel = "cancel",
}
export const createOrderService = async (
  amount: number,
  unitPrice: number,
  sale: number,
  total: number,
  refund: number,
  userId: string,
  serviceSaleId?: number,
  serviceId?: number,
  content?: string
) => {
  const idBem = await generateUniqueShortUuid();
  if (idBem) {
    return await prisma.serviceOrders.create({
      data: {
        id: idBem,
        amount: amount,
        unitPrice: unitPrice,
        sale: sale,
        total: total,
        refund: refund,
        userId: userId,
        serviceId: serviceId,
        serviceSaleId: serviceSaleId,
        content,
      },
    });
  }
};

export const findAccountBudget = async (userId: string) => {
  return prisma.profiles.findUnique({
    where: { userId },
    select: { accountBalance: true },
  });
};
export const updateAccountBudget = async (
  userId: string,
  accountBalance: number
) => {
  return await prisma.profiles.update({
    where: { userId },
    data: { accountBalance: accountBalance },
  });
};

export const createOrderProduct = async (
  amount: number,
  unitPrice: number,
  sale: number,
  total: number,
  refund: number,
  userId: string,
  productSaleId?: number,
  productId?: number
) => {
  const idBem = await generateUniqueShortUuid();
  if (idBem) {
    const fileName = `${idBem}-${uuidv4().slice(0, 8)}.csv`;
    await prisma.productOrders.create({
      data: {
        id: idBem,
        amount: amount,
        unitPrice: unitPrice,
        sale: sale,
        total: total,
        refund: refund,
        userId: userId,
        productId: productId,
        productSaleId: productSaleId,
        productFile: {
          create: {
            name: fileName,
            userId: userId,
          },
        },
      },
    });

    return {
      id: idBem,
      fileUrl: `${process.env.SERVER_HOST}/api/file/data-account/${fileName}`,
    };
  }
};

export const findAccountNoSold = async (id: number, amount: number) => {
  return await prisma.productAccount.findMany({
    where: { productSales: { id: id }, sold: false },
    select: { account: true, password: true, id: true },
    take: amount,
  });
};
export const updateAccountSold = async (
  accountsToUpdate: { account: string; password: string; id: number }[]
) => {
  const accountIds = accountsToUpdate.map((account) => account.id);
  return await prisma.productAccount.updateMany({
    where: { id: { in: accountIds } },
    data: { sold: true },
  });
};
export const updateOrder = async (id: string, status: Status) => {
  const idBem = await generateUniqueShortUuid();
  if (idBem) {
    const newService = await prisma.serviceOrders.update({
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
export const findAllServiceOrder = async () => {
  return await prisma.serviceOrders.findMany({
    include: {
      services: {
        select: {
          id: true,
          category: true,
          subCategory: true,
          receiving: true,
          userId: true,
          user: { select: { username: true } },
        },
      },
      users: { select: { username: true } },
      serviceSales: true,
    },
  });
};
export const findAllProductOrder = async () => {
  return await prisma.productOrders.findMany({
    include: {
      products: {
        select: {
          id: true,
          category: true,
          subCategory: true,
          receiving: true,
          userId: true,
          user: { select: { username: true } },
        },
      },
      users: { select: { username: true } },
      productSales: true,
    },
  });
};
export const findByUserServiceOrder = async (userId: string) => {
  return await prisma.serviceOrders.findMany({
    where: { userId: userId },
    include: {
      services: {
        select: {
          id: true,
          category: true,
          subCategory: true,
          user: { select: { username: true } },
        },
      },
      room: { select: { id: true } },
      serviceSales: true,
    },
  });
};
export const findRoom = async (name: string) => {
  return await prisma.room.findFirst({ where: { name } });
};

export const findByUserProductOrder = async (userId: string) => {
  return await prisma.productOrders.findMany({
    where: { userId: userId },
    include: {
      products: {
        select: {
          id: true,
          category: true,
          subCategory: true,
          user: { select: { username: true } },
        },
      },
      productSales: true,
    },
  });
};
export const findByUserSellOrderService = async (
  userId: string,
  service: RoleService
) => {
  const newService = await prisma.serviceOrders.findMany({
    where: {
      services: {
        userId: userId,
        category: { category: service },
      },
    },
    include: {
      services: {
        select: {
          id: true,
          category: true,
          subCategory: true,
          user: { select: { username: true } },
        },
      },
      users: { select: { username: true } },
      serviceSales: true,
    },
  });
  return newService;
};
export const findByUserSellOrderProduct = async (
  userId: string,
  service: RoleService
) => {
  const newService = await prisma.productOrders.findMany({
    where: {
      products: {
        userId: userId,
        category: { category: service },
      },
    },
    include: {
      products: {
        select: {
          id: true,
          category: true,
          subCategory: true,
          user: { select: { username: true } },
        },
      },
      users: { select: { username: true } },
      productSales: true,
    },
  });
  return newService;
};
export const findByUserBuy = async (id: number, userId: string) => {
  return await prisma.serviceOrders.findFirst({
    where: { serviceId: id, userId: userId },
  });
};
export const findByUserBuyProduct = async (id: number, userId: string) => {
  return await prisma.productOrders.findFirst({
    where: { productId: id, userId: userId },
  });
};

export const findByUserBuyProductOrder = async (id: string, userId: string) => {
  return await prisma.productOrders.findUnique({
    where: { id, userId },
    include: {
      products: { select: { image: true, title: true } },
      productSales: { select: { price: true } },
      productAccountSold: true,
      productFile: true,
    },
  });
};

export const createOrderAccount = async (
  username: string,
  password: string,
  productOrdersId: string
) => {
  return await prisma.productAccountSold.create({
    data: { username, password, productOrdersId },
  });
};

export const findCustomerBuyer = async (id: string, userId: string) => {
  return await prisma.serviceOrders.findUnique({ where: { id, userId } });
};
export const updateConfirmCustomer = async (id: string, check: boolean) => {
  if (check === true) {
    return await prisma.serviceOrders.update({
      where: {
        id,
      },
      data: { confirmSeller: true },
    });
  } else {
    return await prisma.serviceOrders.update({
      where: {
        id,
      },
      data: { buyerConfirm: true },
    });
  }
};
export const updateOrderServiceByAdmin = async (
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
      const order = await prisma.serviceOrders.update({
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
    return await prisma.serviceOrders.update({
      where: {
        id,
      },
      data: { status: status },
    });
  }
};
export const updateOrderProductByAdmin = async (
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
      const order = await prisma.productOrders.update({
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
    return await prisma.productOrders.update({
      where: {
        id,
      },
      data: { status: status },
    });
  }
};

export const findByUserBuyServiceOrder = async (id: string, userId: string) => {
  return await prisma.serviceOrders.findUnique({
    where: { id, userId },
    include: {
      services: { select: { image: true, title: true } },
      serviceSales: { select: { price: true } },
    },
  });
};
