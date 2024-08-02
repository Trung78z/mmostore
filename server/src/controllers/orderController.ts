import { Request, Response } from "express";
import * as orderService from "../services/orderService";
import Papa from "papaparse";
import { writeFile } from "fs";
import path from "path";
export const createOrderService = async (req: Request, res: Response) => {
  const { amount, unitPrice, sale, total, refund, serviceId, serviceSaleId } =
    req.body;

  try {
    if (req.user) {
      const newService = await orderService.createOrderService(
        amount,
        unitPrice,
        sale,
        total,
        refund,
        req.user.id,
        serviceSaleId,
        serviceId
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
export const createOrderProduct = async (req: Request, res: Response) => {
  const { amount, unitPrice, sale, total, refund, productId, productSaleId } =
    req.body;
  try {
    if (req.user) {
      const findAccountNoSold = await orderService.findAccountNoSold(
        productSaleId,
        amount
      );
      if (findAccountNoSold.length < amount) {
        return res.json({
          success: false,
          msg: "Hiện tại chúng tôi không đủ số lượng cho đơn hàng này!",
          data: findAccountNoSold.length,
        });
      }

      const order = await orderService.createOrderProduct(
        amount,
        unitPrice,
        sale,
        total,
        refund,
        req.user.id,
        productSaleId,
        productId
      );
      const accountsWithIndex = findAccountNoSold.map((account, index) => ({
        STT: index + 1,
        account: account.account,
        password: account.password,
      }));
      const csv = Papa.unparse(accountsWithIndex);
      const fileName = order?.fileUrl.split("/data-account/")[1];
      const filePath = path.join(
        __dirname,
        "..",
        `/uploads/orders/${fileName}`
      );

      writeFile(filePath, csv, (err) => {
        if (err) {
          console.error("Error writing CSV file:", err);
        } else {
          console.log("CSV file was written successfully");
        }
      });
      await orderService.updateAccountSold(findAccountNoSold);
      return res.status(201).json({ success: true, msg: { ...order } });
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

export const findAllServiceOrderByAdmin = async (
  req: Request,
  res: Response
) => {
  try {
    const order = await orderService.findAllServiceOrder();
    return res.status(200).json({ success: true, order });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ error: "Internal server error" });
  }
};
export const findAllProductOrderByAdmin = async (
  req: Request,
  res: Response
) => {
  try {
    const order = await orderService.findAllProductOrder();
    return res.status(200).json({ success: true, order });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ error: "Internal server error" });
  }
};
export const findByUserServiceOrder = async (req: Request, res: Response) => {
  try {
    if (req.user) {
      const order = await orderService.findByUserServiceOrder(req.user.id);
      return res.status(200).json({ success: true, order });
    } else {
      return res
        .status(200)
        .json({ success: false, message: "User not authenticated" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
export const findByUserProductOrder = async (req: Request, res: Response) => {
  try {
    if (req.user) {
      const order = await orderService.findByUserProductOrder(req.user.id);
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
export const findByUserServiceSellOrder = async (
  req: Request,
  res: Response
) => {
  const { service } = req.params;
  try {
    if (req.user) {
      const order = await orderService.findByUserSellOrderService(
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
export const findByUserProductSellOrder = async (
  req: Request,
  res: Response
) => {
  const { service } = req.params;
  try {
    if (req.user) {
      const order = await orderService.findByUserSellOrderProduct(
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
export const findByProductUserBuy = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    if (req.user) {
      const order = await orderService.findByUserBuyProduct(
        parseInt(id),
        req.user.id
      );
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
export const findByServiceUserBuy = async (req: Request, res: Response) => {
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
export const updateOrderByAdminService = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const { status, total, userId } = req.body;

  try {
    const order = await orderService.updateOrderServiceByAdmin(
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
export const updateOrderByAdminProduct = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const { status, total, userId } = req.body;

  try {
    const order = await orderService.updateOrderProductByAdmin(
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
