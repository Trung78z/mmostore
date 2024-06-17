import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import prisma from "./configs/prisma";
const app = express();
app.use(cors({ origin: true, optionsSuccessStatus: 200, credentials: true }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get("/db", async (req, res) => {
  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
      profile: true,
    },
  });
  return res.json({ message: allUsers });
});
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to api!" });
});

export default app;
