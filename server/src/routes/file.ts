import { Router } from "express";
import { getFile } from "../controllers/fileController";
const router = Router();

router.get("/data-account/:filename", getFile);
export default router;
