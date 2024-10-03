import { Request, Response } from "express";
import * as productService from "../services/productService";
import { configDotenv } from "dotenv";
configDotenv();

export const createService = async (req: Request, res: Response) => {
  const {
    title,
    content,
    description,
    duplicate,
    receiving,
    reseller,
    categoryId,
    subCategoryId,
    serviceSales,
  } = req.body;

  const duplicateCheck = duplicate === "true" ? true : false;
  const resellerCheck = reseller === "true" ? true : false;

  const filename = req.file?.filename;
  const imageUrl = filename
    ? `${process.env.SERVER_HOST}/api/image/uploads/products/${filename}`
    : "";
  let serviceSalesCheck = JSON.parse(serviceSales);
  serviceSalesCheck = serviceSalesCheck.map((sale: any) => ({
    ...sale,
    price: parseInt(sale.price, 10),
  }));
  let newRecords = [];
  for (const record of serviceSalesCheck) {
    const uniquePoached = await productService.generateUniquePoached(
      500,
      10000
    );
    newRecords.push({
      ...record,
      poached: uniquePoached,
    });
  }
  try {
    if (req.user) {
      const findFirstTitle = await productService.findFirstService(title);
      if (findFirstTitle) {
        return res.json({
          success: false,
          msg: "Đã có người đặt tên cho sản phẩm này!",
        });
      }
      console.log(title);
      const newService = await productService.createService(
        receiving,
        title,
        content,
        description,
        duplicateCheck,
        resellerCheck,
        parseInt(categoryId),
        parseInt(subCategoryId),
        newRecords as any,
        imageUrl,
        req.user.id
      );
      return res.status(201).json({ success: true, id: newService });
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

export const createReview = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { level, content } = req.body;
  try {
    if (req.user) {
      const review = await productService.createReview(
        level,
        content,
        req.user.id,
        parseInt(id)
      );
      return res.status(201).json({ success: true, id: review });
    } else {
      return res
        .status(200)
        .json({ success: false, msg: "User not authenticated" });
    }
  } catch (error) {}
};

export const getServiceById = async (req: Request, res: Response) => {
  const { slug } = req.params;

  try {
    const post = await productService.findByIdService(slug);
    res.status(200).json({ success: true, msg: post });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
export const getServices = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const services = await productService.findAllServiceById(id);
    if (services) {
      return res.status(200).json({ success: true, msg: services });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
export const getSeed = async (req: Request, res: Response) => {
  try {
    const services = await productService.findSeed();
    if (services) {
      return res.status(200).json({ success: true, msg: services });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getProductAllByAdmin = async (req: Request, res: Response) => {
  try {
    const services = await productService.findAllProductAllByAdmin();

    return res.status(200).json({ success: true, msg: services });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
export const getProductReviewBySale = async (req: Request, res: Response) => {
  try {
    const services = await productService.findAllProductReviewBySale();

    return res.status(200).json({ success: true, msg: services });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getByUserServices = async (req: Request, res: Response) => {
  try {
    if (req.user) {
      const posts = await productService.findAllServiceByUser(req.user.id);
      res.status(200).json({ success: true, msg: posts });
    } else {
      return res
        .status(200)
        .json({ success: false, msg: "User not authenticated" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getByUserProductSale = async (req: Request, res: Response) => {
  const { slug } = req.params;
  try {
    if (req.user) {
      const posts = await productService.findAllProductSale(req.user.id, slug);
      res.status(200).json({ success: true, msg: posts });
    } else {
      return res
        .status(200)
        .json({ success: false, msg: "User not authenticated" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
export const createAccountProductSale = async (req: Request, res: Response) => {
  const { account, password, poached } = req.body;
  try {
    if (!req.user) {
      return res
        .status(200)
        .json({ success: false, msg: "User not authenticated" });
    }
    const findPoached = await productService.findProductSaleByPoached(
      poached.toString()
    );
    if (!findPoached) {
      return res.json({ success: false, msg: "Kho không tồn tại!" });
    }
    const data = await productService.createAccountProductSale(
      account,
      password,
      poached
    );
    res.status(200).json({ success: true, msg: data });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

interface AccountProduct {
  account: string;
  password: string;
  poachedId: string;
}

export const createAccountProductSaleMany = async (
  req: Request,
  res: Response
) => {
  const { dataCsv } = req.body;

  let dataMany: AccountProduct[] = []; // Đảm bảo dataMany có kiểu đúng
  for (let item of dataCsv) {
    if (!item.poached) {
      return res.status(200).json({
        success: false,
        msg: "Vui lòng thêm thông tin kho trong file!",
      });
    }

    const findPoached = await productService.findProductSaleByPoached(
      item.poached.toString()
    );
    if (!findPoached) {
      return res.json({ success: false, msg: "Kho không tồn tại!" });
    }

    if (!item.account || !item.password) {
      return res.status(200).json({
        success: false,
        msg: "Vui lòng thêm đầy đủ thông tin tài khoản trong file!",
      });
    }

    dataMany.push({
      account: item.account.toString(),
      password: item.password.toString(),
      poachedId: item.poached.toString(),
    });
  }

  try {
    if (!req.user) {
      return res
        .status(200)
        .json({ success: false, msg: "User not authenticated" });
    }

    const data = await productService.createAccountProductSaleMany(dataMany);
    return res.status(200).json({ success: true, msg: data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteAccountProductSale = async (req: Request, res: Response) => {
  const { id, poached } = req.query;

  try {
    const idd = parseInt((id as string) || "0");
    await productService.deleteAccountProductSale(idd, poached as string);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateServiceById = async (req: Request, res: Response) => {
  const { title, content } = req.body;
  const filename = req.file?.filename;
  const url = filename
    ? `${process.env.SERVER_HOST}/api/image/uploads/services/${filename}`
    : "";
  const { id } = req.params;

  try {
    if (req.user) {
      const updateService = await productService.updateServiceById(
        parseInt(id),
        title,
        content,
        url,
        req.user.id
      );
      if (updateService) {
        return res.status(200).json({ updateService });
      } else {
        return res.status(200).json({ success: false });
      }
    } else {
      return res
        .status(200)
        .json({ success: false, msg: "User not authenticated" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const updateServiceByAdmin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    try {
      await productService.updatePostByAdmin(parseInt(id), status);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  } catch (error) {}
};

// Delete the authenticated user's profile
export const deleteServiceById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    if (req.user) {
      await productService.deleteServiceById(parseInt(id), req.user.id);
      res.sendStatus(204);
    } else {
      return res
        .status(200)
        .json({ success: false, msg: "User not authenticated" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
