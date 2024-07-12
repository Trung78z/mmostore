import { Request, Response } from "express";
import * as serviceService from "../services/serviceService";
import fs from "fs";
import path from "path";
import { configDotenv } from "dotenv";
configDotenv();
export const images = (req: Request, res: Response) => {
  return res.sendStatus(200);
};
export const getImages = (req: Request, res: Response) => {
  const filename = req.params.filename;

  const filePath = path.join(__dirname, "../uploads", filename);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res
        .status(404)
        .json({ success: false, message: "File not found" });
    }

    res.sendFile(filePath);
  });
};

export const createService = async (req: Request, res: Response) => {
  const { title, content } = req.body;
  const filename = req.file?.filename;
  const url = filename
    ? `${process.env.HOST}/api/post/uploads/services/${filename}`
    : "";

  try {
    if (req.user) {
      const newService = await serviceService.createService(
        title,
        content,
        url,
        req.user.id
      );
      return res.status(201).json({ success: true, id: newService });
    } else {
      return res
        .status(200)
        .json({ success: false, message: "User not authenticated" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
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
  try {
    const posts = await serviceService.findAllService();
    if (posts) {
      return res.status(200).json({ success: true, msg: posts });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
export const getByUserServices = async (req: Request, res: Response) => {
  try {
    if (req.user) {
      console.log(req.user);

      const posts = await serviceService.findAllServiceByUser(req.user.id);
      res.status(200).json({ success: true, msg: posts });
    } else {
      return res
        .status(200)
        .json({ success: false, message: "User not authenticated" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update the authenticated user's profile
export const updateServiceById = async (req: Request, res: Response) => {
  const { title, content } = req.body;
  const filename = req.file?.filename;
  const url = filename
    ? `${process.env.HOST}/api/post/uploads/${filename}`
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
        .json({ success: false, message: "User not authenticated" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
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
        .json({ success: false, message: "User not authenticated" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
