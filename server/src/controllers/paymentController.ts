import { Request, Response } from "express";
import * as paymentService from "../services/paymentService";

export const createPayment = async (req: Request, res: Response) => {
  const { total } = req.body;
  try {
    if (req.user) {
      const newService = await paymentService.createPayment(req.user.id, total);
      return res.status(201).json({ success: true, newService });
    } else {
      return res
        .status(200)
        .json({ success: false, msg: "User not authenticated" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const createWithdraw = async (req: Request, res: Response) => {
  const { total, banking, accountBank, description } = req.body;
  try {
    if (req.user) {
      const withDraw = await paymentService.createWithdraw(
        total,
        banking,
        accountBank,
        description,
        req.user.id
      );
      res.status(200).json({ success: true, withDraw });
    } else {
      return res
        .status(200)
        .json({ success: false, msg: "User not authenticated" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const updatePayment = async (req: Request, res: Response) => {
  const { total } = req.body;
  const { id } = req.params;

  const filename = req.file?.filename;
  const imageUrl = filename
    ? `${process.env.SERVER_HOST}/api/image/uploads/payment/${filename}`
    : "";
  try {
    if (req.user) {
      const newService = await paymentService.updatePayment(
        id,
        req.user.id,
        parseInt(total),
        imageUrl
      );
      return res.status(201).json({ success: true, newService });
    } else {
      return res
        .status(200)
        .json({ success: false, msg: "User not authenticated" });
    }
  } catch (error) {
    console.log(error);

    return res.status(500).json({ error: "Internal server error" });
  }
};

export const updatePaymentByAdmin = async (req: Request, res: Response) => {
  const { userId, total } = req.body;
  const { id } = req.params;
  try {
    if (req.user) {
      const payment = await paymentService.updatePaymentByAdmin(
        id,
        userId,
        parseInt(total)
      );
      return res.status(201).json({ success: true, payment });
    } else {
      return res
        .status(200)
        .json({ success: false, msg: "User not authenticated" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const updateWithdrawByAdmin = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    if (req.user) {
      const withdraw = await paymentService.updateWithdrawByAdmin(id, status);
      return res.status(200).json({ success: true, withdraw });
    } else {
      return res
        .status(200)
        .json({ success: false, msg: "User not authenticated" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
export const updatePaymentByAdminStatus = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const response = await paymentService.updatePaymentByAdminStatus(
      id,
      status
    );
    return res.status(200).json({ success: true, msg: response });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const findAllWithDrawByUser = async (req: Request, res: Response) => {
  try {
    if (req.user) {
      const payment = await paymentService.findAllWithDrawByUser(req.user.id);
      return res.status(201).json({ success: true, payment });
    } else {
      return res
        .status(200)
        .json({ success: false, msg: "User not authenticated" });
    }
  } catch (error) {
    console.log(error);

    return res.status(500).json({ error: "Internal server error" });
  }
};

export const findAllWithDrawByAdmin = async (req: Request, res: Response) => {
  try {
    const payment = await paymentService.findAllWithDrawByAdmin();
    return res.status(201).json({ success: true, payment });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ error: "Internal server error" });
  }
};

export const findAllByUser = async (req: Request, res: Response) => {
  try {
    if (req.user) {
      const payment = await paymentService.findAllPaymentByUser(req.user.id);
      return res.status(201).json({ success: true, payment });
    } else {
      return res
        .status(200)
        .json({ success: false, msg: "User not authenticated" });
    }
  } catch (error) {
    console.log(error);

    return res.status(500).json({ error: "Internal server error" });
  }
};

export const findAllPaymentByAdmin = async (req: Request, res: Response) => {
  try {
    if (req.user) {
      const payment = await paymentService.findALlPaymentByAdmin();
      return res.status(201).json({ success: true, payment });
    } else {
      return res
        .status(200)
        .json({ success: false, msg: "User not authenticated" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
