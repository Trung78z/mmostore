import { Request, Response, Router } from "express";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const { amount = 1 } = req.body;
  await new Promise((resolve) => setTimeout(resolve, 500));
  res.json({ data: amount });
});

export default router;
