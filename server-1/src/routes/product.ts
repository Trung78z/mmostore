import { Router } from "express";
import {
  createProduct,
  getProductById,
  getProducts,
  updateProductById,
  deleteProductById,
  images,
  getImages,
  getByUserProducts,
} from "../controllers/productController ";
import authMiddleware from "../middlewares/authMiddleware";

import { upload } from "../helpers/multerPost";

const router = Router();

router.post("/create", upload.single("avatar"), authMiddleware, createProduct);
router.post("/test", upload.single("avatar"), images);
// Protected routes
// *Get post
router.get("/:slug", getProductById);
router.get("/", getProducts);
router.get("/user/posts", authMiddleware, getByUserProducts);

// * Edit post
router.put("/:id", upload.single("avatar"), authMiddleware, updateProductById);
router.delete("/:id", authMiddleware, deleteProductById);

router.get("/uploads/:filename", getImages);

export default router;
