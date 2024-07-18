import { Router } from "express";
import {
  createOrder,
  findAllOrder,
  findByUserOrder,
  findByUserSellOrder,
  updateConfirm,
  updateOrderByAdmin,
} from "../controllers/orderController";
import authMiddleware from "../middlewares/authMiddleware";
import roleMiddleware from "../middlewares/roleMiddleware";

const router = Router();

router.post("/create", authMiddleware, createOrder);
router.get("/", authMiddleware, roleMiddleware("ADMIN"), findAllOrder);
router.get("/user", authMiddleware, findByUserOrder);
router.get("/userSell/:service", authMiddleware, findByUserSellOrder);

router.put("/:id", authMiddleware, updateConfirm);
router.put(
  "/admin/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  updateOrderByAdmin
);

// router.put("/:id", authMiddleware, updateServiceById);
// router.delete("/:id", authMiddleware, deleteServiceById);

// router.get("/uploads/:filename", getImages);

export default router;
