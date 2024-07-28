import { Router } from "express";
import {
  createMessage,
  createRoom,
  createRoomAdmin,
  deleteRoomChat,
  findRoom,
  getMessage,
  joinRoom,
} from "../controllers/chatController";
import authMiddleware from "../middlewares/authMiddleware";
import roleMiddleware from "../middlewares/roleMiddleware";

const router = Router();

router.post("/room", authMiddleware, createRoom);
router.post("/room/admin/create", authMiddleware, createRoomAdmin);
router.post("/rooms/:roomId/join", authMiddleware, joinRoom);
router.post("/rooms/:roomId/messages", authMiddleware, createMessage);
router.get("/rooms/:roomId/messages", authMiddleware, getMessage);
router.get("/users/rooms", authMiddleware, findRoom);
router.delete("/user/out/:id", authMiddleware, deleteRoomChat);
export default router;
