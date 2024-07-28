import { Router } from "express";
import { getImages } from "../controllers/imageController";

const router = Router();

router.get("/uploads/:category/:filename", getImages);

export default router;
