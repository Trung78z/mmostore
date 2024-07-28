import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import RootRouter from "./routes";
import path from "path";
const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:8080",
      "https://taphoazalo.com",
      "https://www.taphoazalo.com",
      "https://admin.taphoazalo.com",
    ],
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

app.use(express.static(path.join(__dirname + "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", RootRouter);

export default app;
