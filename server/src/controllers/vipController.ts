import { Request, Response } from "express";
import prisma from "../configs/dbs";
import client from "../configs/redisClient";

export const getUser = async (req: Request, res: Response) => {
  try {
    // Lấy giá trị từ Redis cache
    const value = await client.get("key");

    if (value) {
      console.log("Cache hit");
      return res.json({ status: true, msg: JSON.parse(value) });
    }

    console.log("Cache miss");
    const msg = await prisma.users.findMany({ include: { profiles: true } });
    await client.set("key", JSON.stringify(msg), {
      EX: 3600 + Math.floor(Math.random() * 50),
    });

    res.json({ status: true, msg: msg });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const getProduct = async (req: Request, res: Response) => {
  try {
    const value = await client.get("product");

    if (value) {
      console.log("Cache hit");
      return res.json({ status: true, msg: JSON.parse(value) });
    }

    console.log("Cache miss");
    const msg = await prisma.products.findMany({
      include: { productSales: true, productOrders: true },
    });

    res.json({ status: true, msg: msg });
    await client.set("product", JSON.stringify(msg), {
      EX: 3600 + Math.floor(Math.random() * 50),
    });
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
    await client.FLUSHALL();
    console.log("clear-redis");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
