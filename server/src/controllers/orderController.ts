import { Request, Response } from "express";
import * as orderService from "../services/orderService";

export const createOrder = async (req: Request, res: Response) => {
  const { amount, unitPrice, sale, total, refund, servicesId, serviceSalesId } =
    req.body;

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
        servicesId
      );

      return res.status(201).json({ success: true, newService });
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
      const order = await orderService.findByUserOrder(req.user.id);
      return res.status(201).json({ success: true, order });
    } else {
      return res
        .status(200)
        .json({ success: false, message: "User not authenticated" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

enum RoleService {
  service = "service",
  product = "product",
}
export const findByUserSellOrder = async (req: Request, res: Response) => {
  const { service } = req.params;
  try {
    if (req.user) {
      const order = await orderService.findByUserSellOrder(
        req.user.id,
        service as RoleService
      );
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
export const findByUserBuy = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    if (req.user) {
      const order = await orderService.findByUserBuy(parseInt(id), req.user.id);
      return res.status(201).json({ success: true, msg: order });
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

export const updateConfirm = async (req: Request, res: Response) => {
  const { id } = req.params;
  // const { RoleService } = req.user;
  try {
    if (req.user) {
      const order = await orderService.updateConfirmCustomer(id, req.user.role);
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
export const updateOrderByAdmin = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, total, userId } = req.body;

  try {
    const order = await orderService.updateOrderByAdmin(
      id,
      status,
      parseInt(total),
      userId
    );
    return res.status(201).json({ success: true, order });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ error: "Internal server error" });
  }
};
