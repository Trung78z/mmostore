import { Router } from "express";
import { createPayWithWebHook } from "../controllers/webhookController";
const router = Router();

router.post("/", createPayWithWebHook);

export default router;
