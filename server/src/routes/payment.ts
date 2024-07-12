import { Router } from "express";
import {
  createPayment,
  deletePayment,
  findAllByUser,
  findAllPaymentByAdmin,
  updatePayment,
  updatePaymentByAdmin,
  updatePaymentByAdminSuccess,
} from "../controllers/paymentController";
import authMiddleware from "../middlewares/authMiddleware";
import { upload } from "../helpers/multerPayment";
import roleMiddleware from "../middlewares/roleMiddleware";
const router = Router();
router.post("/", authMiddleware, createPayment);
router.put("/:id", upload.single("payment"), authMiddleware, updatePayment);
router.put(
  "/admin/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  updatePaymentByAdmin
);
router.put(
  "/admin/success/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  updatePaymentByAdminSuccess
);

router.get("/", authMiddleware, findAllByUser);
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
