import { Router } from "express";
import {
  createPayment,
  createWithdraw,
  deletePayment,
  findAllByUser,
  findAllPaymentByAdmin,
  findAllWithDrawByAdmin,
  findAllWithDrawByUser,
  updatePayment,
  updatePaymentByAdmin,
  updatePaymentByAdminSuccess,
  updateWithdraw,
} from "../controllers/paymentController";
import authMiddleware from "../middlewares/authMiddleware";
import { upload } from "../helpers/multerPayment";
import roleMiddleware from "../middlewares/roleMiddleware";
const router = Router();
router.post("/", authMiddleware, createPayment);
router.post("/withdraw", authMiddleware, createWithdraw);
router.put("/:id", upload.single("payment"), authMiddleware, updatePayment);
router.put(
  "/admin/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  updatePaymentByAdmin
);
router.put(
  "/admin/withdraw/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  updateWithdraw
);
router.put(
  "/admin/success/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  updatePaymentByAdminSuccess
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

router.delete("/:id", authMiddleware, roleMiddleware("ADMIN"), deletePayment);

// router.get("/user", authMiddleware, findByUserOrder);
// router.get("/userSell", authMiddleware, findByUserSellOrder);

export default router;
