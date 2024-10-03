import { Request, Response } from "express";
import * as serviceService from "../services/serviceService";
import fs from "fs";
import path from "path";
import { configDotenv } from "dotenv";
configDotenv();

export const getImages = (req: Request, res: Response) => {
  const filename = req.params.filename;

  const filePath = path.join(__dirname, "../../public/uploads", filename);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ success: false, msg: "File not found" });
    }

    res.sendFile(filePath);
  });
};

export const createService = async (req: Request, res: Response) => {
  const {
    title,
    content,
    description,
    receiving,
    reseller,
    categoryId,
    subCategoryId,
    serviceSales,
  } = req.body;
  const resellerCheck = reseller === "true" ? true : false;

  const filename = req.file?.filename;
  const imageUrl = filename
    ? `${process.env.SERVER_HOST}/api/image/uploads/services/${filename}`
    : "";
  let serviceSalesCheck = JSON.parse(serviceSales);
  serviceSalesCheck = serviceSalesCheck.map((sale: any) => ({
    ...sale,
    price: parseInt(sale.price, 10),
  }));

  try {
    if (req.user) {
      const findFirstTitle = await serviceService.findFirstService(title);
      if (findFirstTitle) {
        return res.json({
          success: false,
          msg: "Đã có người đặt tên cho sản phẩm này!",
        });
      }

      const newService = await serviceService.createService(
        receiving,
        title,
        content,
        description,
        resellerCheck,
        parseInt(categoryId),
        parseInt(subCategoryId),
        serviceSalesCheck,
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
      const review = await serviceService.createReview(
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
    const post = await serviceService.findByIdService(slug);
    res.status(200).json({ success: true, msg: post });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
export const getServices = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const services = await serviceService.findAllServiceById(id);
    if (services) {
      return res.status(200).json({ success: true, msg: services });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
export const getSeed = async (req: Request, res: Response) => {
  try {
    const services = await serviceService.findSeed();
    return res.status(200).json({ success: true, msg: services });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getServicesAllByAdmin = async (req: Request, res: Response) => {
  try {
    const services = await serviceService.findAllByAdmin();

    return res.status(200).json({ success: true, msg: services });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
export const getByUserServices = async (req: Request, res: Response) => {
  try {
    if (req.user) {
      const posts = await serviceService.findAllServiceByUser(req.user.id);
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
export const getServiceReviewBySale = async (req: Request, res: Response) => {
  try {
    const services = await serviceService.findAllServiceReviewBySale();

    return res.status(200).json({ success: true, msg: services });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update the authenticated user's profile
export const updateServiceById = async (req: Request, res: Response) => {
  const { title, content } = req.body;
  const filename = req.file?.filename;
  const url = filename
    ? `${process.env.SERVER_HOST}/api/image/uploads/services/${filename}`
    : "";
  const { id } = req.params;

  try {
    if (req.user) {
      const updateService = await serviceService.updateServiceById(
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
      await serviceService.updatePostByAdmin(parseInt(id), status);
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
      await serviceService.deleteServiceById(parseInt(id), req.user.id);
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
