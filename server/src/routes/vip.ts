import { Router } from "express";

import {
  clearRedis,
  getProduct,
  getService,
  getUser,
} from "../controllers/vipController";
const router = Router();
router.get("/users", getUser);
router.get("/products", getProduct);
router.get("/services", getService);
router.get("/clear-redis", clearRedis);
export default router;
