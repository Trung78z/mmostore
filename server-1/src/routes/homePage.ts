import { Router } from "express";
import {
  findHomePage,
  updateHomePage,
} from "../controllers/homepageController";

const router = Router();

// *Get post

router.get("/", findHomePage);
router.post("/", findHomePage);

router.put("/", updateHomePage);

export default router;
