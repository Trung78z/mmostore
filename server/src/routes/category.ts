import { Router } from "express";
import {
  getCatePost,
  getCatePostData,
  getCateProduct,
  getCateProductSub,
  getCateService,
  getCateServiceSub,
} from "../controllers/categoryController";

const router = Router();
router.get("/services", getCateService);
router.get("/services/:id", getCateServiceSub);
router.get("/products", getCateProduct);
router.get("/products/:id", getCateProductSub);
router.get("/postShares", getCatePost);
router.get("/postShares/:slug", getCatePostData);

export default router;
