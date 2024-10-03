import { Router } from "express";
import {
  createOrderProduct,
  createOrderService,
  findByUserServiceOrder,
  updateConfirm,
  findByUserProductOrder,
  findAllServiceOrderByAdmin,
  findAllProductOrderByAdmin,
  findByUserServiceSellOrder,
  findByUserProductSellOrder,
  updateOrderByAdminService,
  updateOrderByAdminProduct,
  findByServiceUserBuy,
  findByProductUserBuy,
  findByProductUserOrder,
  findByServiceUserOrder,
} from "../controllers/orderController";
import authMiddleware from "../middlewares/authMiddleware";
import roleMiddleware from "../middlewares/roleMiddleware";

const router = Router();

router.post("/create-service", authMiddleware, createOrderService);
router.post("/create-product", authMiddleware, createOrderProduct);

router.get(
  "/service",
  authMiddleware,
  roleMiddleware("ADMIN"),
  findAllServiceOrderByAdmin
);
router.get(
  "/product",
  authMiddleware,
  roleMiddleware("ADMIN"),
  findAllProductOrderByAdmin
);

router.get("/user-service", authMiddleware, findByUserServiceOrder);
router.get("/user-product", authMiddleware, findByUserProductOrder);

router.get("/user-sell-service", authMiddleware, findByUserServiceSellOrder);
router.get("/user-sell-product", authMiddleware, findByUserProductSellOrder);

router.get("/user-service/:id", authMiddleware, findByServiceUserBuy);
router.get("/user-product/:id", authMiddleware, findByProductUserBuy);
router.get("/user-product/order/:id", authMiddleware, findByProductUserOrder);
router.get("/user-service/order/:id", authMiddleware, findByServiceUserOrder);

router.put("/service/:id", authMiddleware, updateConfirm);

router.put(
  "/admin-service/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  updateOrderByAdminService
);
router.put(
  "/admin-product/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  updateOrderByAdminProduct
);
export default router;
