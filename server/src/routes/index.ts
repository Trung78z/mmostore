import express from "express";
import authRoutes from "./user";
import postRoutes from "./post";

import categoryRoutes from "./category";
import serviceRoutes from "./service";
import productRoutes from "./product";
import imageRoutes from "./image";
import fileRoutes from "./file";
import orderRoutes from "./order";
import paymentRoutes from "./payment";
import contactRoutes from "./contact";
import chatRoutes from "./chat";
import vipRoutes from "./vip";
import webHookRoutes from "./webhook";
const RootRouter = express();

RootRouter.use("/user", authRoutes);
RootRouter.use("/posts", postRoutes);
RootRouter.use("/categories", categoryRoutes);
RootRouter.use("/image", imageRoutes);
RootRouter.use("/services", serviceRoutes);
RootRouter.use("/products", productRoutes);
RootRouter.use("/orders", orderRoutes);
RootRouter.use("/payment", paymentRoutes);
RootRouter.use("/contacts", contactRoutes);
RootRouter.use("/chats", chatRoutes);
RootRouter.use("/vips", vipRoutes);
RootRouter.use("/file", fileRoutes);
RootRouter.use("/webhook-event-handler", webHookRoutes);
RootRouter.get("/", (req, res) => {
  res.json({ exp: Math.floor(Date.now() / 1000) });
});

export default RootRouter;
