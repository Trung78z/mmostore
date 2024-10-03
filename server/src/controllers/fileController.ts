import { Request, Response } from "express";
import path from "path";

export const getFile = (req: Request, res: Response) => {
  const { filename } = req.params;
  const filePath = path.join(
    __dirname,
    `../../public/uploads/orders/${filename}`
  );
  res.download(filePath, "account.csv", (err) => {
    if (err) {
      console.error("Error downloading CSV file:", err);
      res.status(500).send("Error downloading file");
    }
  });
};
