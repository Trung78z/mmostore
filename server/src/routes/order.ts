import { Router } from "express";
import {
  createOrder,
  findAllOrder,
  findByUserOrder,
  findByUserSellOrder,
} from "../controllers/orderController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.post("/create", authMiddleware, createOrder);
// router.get("/:slug", getServiceById);
router.get("/", findAllOrder);
router.get("/user", authMiddleware, findByUserOrder);
router.get("/userSell/:service", authMiddleware, findByUserSellOrder);

// router.put("/:id", upload.single("avatar"), authMiddleware, updateServiceById);
// router.delete("/:id", authMiddleware, deleteServiceById);

// router.get("/uploads/:filename", getImages);

export default router;
