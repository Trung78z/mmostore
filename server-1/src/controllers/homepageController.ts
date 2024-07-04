import { Request, Response } from "express";
import * as homePageService from "../services/homePageService";

export const findHomePage = async (req: Request, res: Response) => {
  try {
    const content = await homePageService.findFirst();
    return res.status(201).json({ success: true, content });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Update the authenticated user's profile
export const updateHomePage = async (req: Request, res: Response) => {
  const { content } = req.body;
  try {
    const updateContent = await homePageService.updateDesPage(content);
    return res.status(201).json({ success: true, updateContent });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
