import { Request, Response } from "express";
import fs from "fs";
import path from "path";

export const images = (req: Request, res: Response) => {
  return res.sendStatus(200);
};
export const getImages = (req: Request, res: Response) => {
  const { category, filename } = req.params;
  const filePath = path.join(__dirname, `../uploads/${category}/${filename}`);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res
        .status(404)
        .json({ success: false, message: "File not found" });
    }
    res.sendFile(filePath);
  });
};
