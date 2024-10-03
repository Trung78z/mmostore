import { Router } from "express";
import {
  getImageChat,
  getImagePay,
  getImages,
} from "../controllers/imageController";

const router = Router();

router.get("/uploads/:category/:filename", getImages);
router.get("/chat/:filename", getImageChat);
router.get("/pay/:filename", getImagePay);
export default router;
