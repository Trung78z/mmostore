import { Router } from "express";
import {
  getCatePost,
  getCatePostData,
  // getCateProduct,
  getCateService,
  getCateSub,
} from "../controllers/categoryController";

const router = Router();

// router.get("/products", getCateProduct);
router.get("/services", getCateService);
router.get("/services/:id", getCateSub);
router.get("/postShares", getCatePost);
router.get("/postShares/:slug", getCatePostData);

export default router;
