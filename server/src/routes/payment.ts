import { Router } from "express";
import {
  createPayment,
  createWithdraw,
  findAllByUser,
  findAllPaymentByAdmin,
  findAllWithDrawByAdmin,
  findAllWithDrawByUser,
  updatePayment,
  updatePaymentByAdmin,
  updatePaymentByAdminStatus,
  updateWithdrawByAdmin,
} from "../controllers/paymentController";
import authMiddleware from "../middlewares/authMiddleware";
import { upload } from "../helpers/multerPayment";
import roleMiddleware from "../middlewares/roleMiddleware";
const router = Router();
router.post("/", authMiddleware, createPayment);
router.post("/withdraw", authMiddleware, createWithdraw);
router.put("/:id", upload.single("payment"), authMiddleware, updatePayment);
router.put(
  "/admin/pay/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  updatePaymentByAdmin
);
router.put(
  "/admin/draw/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  updateWithdrawByAdmin
);

router.put(
  "/admin/payment/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  updatePaymentByAdminStatus
);

router.get("/", authMiddleware, findAllByUser);
router.get("/withdraw/user", authMiddleware, findAllWithDrawByUser);
router.get(
  "/withdraw/admin",
  authMiddleware,
  roleMiddleware("ADMIN"),
  findAllWithDrawByAdmin
);
router.get(
  "/admin",
  authMiddleware,
  roleMiddleware("ADMIN"),
  findAllPaymentByAdmin
);

// router.get("/user", authMiddleware, findByUserOrder);
// router.get("/userSell", authMiddleware, findByUserSellOrder);

export default router;
