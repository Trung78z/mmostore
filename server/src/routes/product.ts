import { Router } from "express";
import {
  createService,
  getServiceById,
  getServices,
  updateServiceById,
  deleteServiceById,
  getByUserServices,
  updateServiceByAdmin,
  getProductAllByAdmin,
  getSeed,
  createReview,
  getByUserProductSale,
  createAccountProductSale,
  deleteAccountProductSale,
  createAccountProductSaleMany,
  getProductReviewBySale,
} from "../controllers/productController";
import authMiddleware from "../middlewares/authMiddleware";

import { upload } from "../helpers/multerProduct";
import roleMiddleware from "../middlewares/roleMiddleware";

const router = Router();

router.post("/create", upload.single("product"), authMiddleware, createService);
router.post("/createReview/:id", authMiddleware, createReview);
router.get("/id/:slug", getServiceById);
router.get("/:id", getServices);
router.get("/fetch/service", getSeed);
router.get("/", getServices);
router.get("/by/user", authMiddleware, getByUserServices);
router.get("/by-product-sales/:slug", authMiddleware, getByUserProductSale);

router.post("/by-product-account", authMiddleware, createAccountProductSale);
router.post(
  "/by-product-account-many",
  authMiddleware,
  createAccountProductSaleMany
);
// router.put("/by-product-account/:id", authMiddleware, getByUserProductSale);
router.delete("/by-product-account", authMiddleware, deleteAccountProductSale);

router.get(
  "/admin/products",
  authMiddleware,
  roleMiddleware("ADMIN"),
  getProductAllByAdmin
);

router.get("/review/by-product", authMiddleware, getProductReviewBySale);

// * Edit post
router.put("/:id", upload.single("avatar"), authMiddleware, updateServiceById);
router.put(
  "/admin/byId/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  updateServiceByAdmin
);
router.delete("/:id", authMiddleware, deleteServiceById);

export default router;
