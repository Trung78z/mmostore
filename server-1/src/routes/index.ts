import express from "express";
import authRoutes from "./user";
import postRoutes from "./post";
import counterRoutes from "./counters";
import homePageRoutes from "./homePage";
const RootRouter = express();

RootRouter.use("/user", authRoutes);
RootRouter.use("/post", postRoutes);
RootRouter.use("/counter", counterRoutes);
RootRouter.use("/home", homePageRoutes);

RootRouter.get("/", (req, res) => {
  res.json({ exp: Math.floor(Date.now() / 1000) });
});

export default RootRouter;
