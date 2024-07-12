import { Request, Response } from "express";
import * as orderService from "../services/orderService";

export const createOrder = async (req: Request, res: Response) => {
  const {
    amount,
    unitPrice,
    sale,
    total,
    refund,
    servicesId,
    productsId,
    serviceSalesId,
  } = req.body;

  try {
    if (req.user) {
      const newService = await orderService.createOrder(
        amount,
        unitPrice,
        sale,
        total,
        refund,
        req.user.id,
        serviceSalesId,
        servicesId,
        productsId
      );
      return res.status(201).json({ success: true, id: newService });
    } else {
      return res
        .status(200)
        .json({ success: false, message: "User not authenticated" });
    }
  } catch (error) {
    console.log(error);

    return res.status(500).json({ error: "Internal server error" });
  }
};
export const findAllOrder = async (req: Request, res: Response) => {
  try {
    const order = await orderService.findAllOrder();
    return res.status(201).json({ success: true, order });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ error: "Internal server error" });
  }
};
export const findByUserOrder = async (req: Request, res: Response) => {
  try {
    if (req.user) {
      console.log(req.user);

      const order = await orderService.findByUserOrder(req.user.id);
      return res.status(201).json({ success: true, order });
    } else {
      return res
        .status(200)
        .json({ success: false, message: "User not authenticated" });
    }
  } catch (error) {
    console.log(error);

    return res.status(500).json({ error: "Internal server error" });
  }
};

export const findByUserSellOrder = async (req: Request, res: Response) => {
  try {
    if (req.user) {
      console.log(req.user);

      const order = await orderService.findByUserOrder(req.user.id);
      return res.status(201).json({ success: true, order });
    } else {
      return res
        .status(200)
        .json({ success: false, message: "User not authenticated" });
    }
  } catch (error) {
    console.log(error);

    return res.status(500).json({ error: "Internal server error" });
  }
};
