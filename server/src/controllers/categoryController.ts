import { Request, Response } from "express";
import * as category from "../services/categoryService";

export const getCatePost = async (req: Request, res: Response) => {
  try {
    const msg = await category.getCategoriesPost();
    res.status(200).json({ success: true, msg });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
export const getCatePostData = async (req: Request, res: Response) => {
  const { slug } = req.params;

  try {
    const msg = await category.getCategoriesPostData(slug);
    res.status(200).json({ success: true, msg });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getCateService = async (req: Request, res: Response) => {
  try {
    const msg = await category.getCategoriesService();
    res.status(200).json({ success: true, msg });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
export const getCateServiceSub = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const msg = await category.getCategoriesServiceSub(id);
    res.status(200).json({ success: true, msg });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getCateProduct = async (req: Request, res: Response) => {
  try {
    const msg = await category.getCategoriesProduct();
    res.status(200).json({ success: true, msg });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
export const getCateProductSub = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const msg = await category.getCategoriesProductSub(id);
    res.status(200).json({ success: true, msg });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
