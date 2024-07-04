import express from "express";
import authRoutes from "./user";
const RootRouter = express();

RootRouter.use("/user", authRoutes);

RootRouter.get("/", (req, res) => {
  res.json({ exp: Math.floor(Date.now() / 1000) });
});

export default RootRouter;
