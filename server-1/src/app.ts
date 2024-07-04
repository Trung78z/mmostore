import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import RootRouter from "./routes";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:8080",
      "https://trungdev.com:3000",
      "http://trungdev.com:3000",
      "https://localhost:3000",
    ],
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api", RootRouter);

export default app;
