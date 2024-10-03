import { Request, Response } from "express";
import prisma from "../configs/dbs";

export const getUser = async (req: Request, res: Response) => {
  try {
    // Lấy giá trị từ Redis cache

    const msg = await prisma.users.findMany({ include: { profiles: true } });

    res.json({ status: true, msg: msg });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const getProduct = async (req: Request, res: Response) => {
  try {
    const msg = await prisma.products.findMany({
      include: { productSales: true, productOrders: true },
    });

    res.json({ status: true, msg: msg });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getService = async (req: Request, res: Response) => {
  try {
    const msg = await prisma.services.findMany({
      include: { serviceSales: true, serviceOrders: true },
    });

    res.json({ status: true, msg: msg });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ***

// ***
export const clearRedis = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
