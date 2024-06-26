import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import prisma from "./configs/prisma";
import mysql from "mysql2/promise";
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Tien2023",
  database: "taphoazalo",
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

const app = express();
app.use(cors({ origin: true, optionsSuccessStatus: 200, credentials: true }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/db", async (req, res) => {
  const result = await prisma.user.findMany();
  // const result = await pool.query("SELECT * FROM User");
  return res.json({ message: result });
});
app.get("/", async (req, res) => {
  try {
    return res.status(200).json({ message: "Welcome to api!" });
  } catch (err) {
    return res.json(err);
  }
});

export default app;
