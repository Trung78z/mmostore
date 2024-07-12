import express from "express";
import authRoutes from "./user";
import postRoutes from "./post";
import homePageRoutes from "./homePage";
import categoryRoutes from "./category";
import serviceRoutes from "./service";
import productRoutes from "./product";
import imageRoutes from "./image";
import orderRoutes from "./order";
const RootRouter = express();

RootRouter.use("/user", authRoutes);
RootRouter.use("/posts", postRoutes);
RootRouter.use("/home", homePageRoutes);
RootRouter.use("/categories", categoryRoutes);
RootRouter.use("/image", imageRoutes);
RootRouter.use("/products", productRoutes);
RootRouter.use("/services", serviceRoutes);
RootRouter.use("/orders", orderRoutes);

RootRouter.get("/", (req, res) => {
  res.json({ exp: Math.floor(Date.now() / 1000) });
});

export default RootRouter;
