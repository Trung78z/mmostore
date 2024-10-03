import { Request, Response } from "express";
import * as chat from "../services/chatService";
export const createRoom = async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const msg = await chat.createRoom(name);
    return res.status(200).json({ success: true, msg });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
export const createRoomAdmin = async (req: Request, res: Response) => {
  const { name, userId, serviceOrdersId } = req.body;

  try {
    if (req.user) {
      const normalizedUserIds = (Array.isArray(userId) ? userId : [userId]).map(
        (id) => (typeof id === "string" ? { userId: id } : id)
      );
      const newUserId = [...normalizedUserIds, { userId: req.user.id }];

      if (newUserId) {
        const msg = await chat.createRoomAdmin(
          name,
          req.user.id,
          newUserId,
          serviceOrdersId
        );
        return res.status(200).json({ success: true, msg });
      }
    } else {
      return res
        .status(401)
        .json({ success: false, msg: "User not authenticated" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export async function createMessage(req: Request, res: Response) {
  const { roomId } = req.params;
  const { content } = req.body;
  try {
    if (req.user) {
      const room = await chat.findRoomById(roomId);

      if (!room) {
        return res.status(404).json({ error: "Room not found" });
      }

      const msg = await chat.createMessage(req.user.id, content, roomId);
      res.status(201).json(msg);
    } else {
      return res
        .status(200)
        .json({ success: false, msg: "User not authenticated" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
}

export async function joinRoom(req: Request, res: Response) {
  const { roomId } = req.params;
  try {
    if (req.user) {
      const room = await chat.findRoomById(roomId);

      if (!room) {
        return res.status(404).json({ error: "Room not found" });
      }

      const roomMember = await chat.createRoomMember(req.user.id, roomId);
      res.status(201).json(roomMember);
    } else {
      return res
        .status(200)
        .json({ success: false, msg: "User not authenticated" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}
export async function findRoom(req: Request, res: Response) {
  try {
    if (req.user) {
      const msg = await chat.findRoomByUser(req.user.id);
      if (msg.length > 0) {
        return res.status(200).json(msg);
      } else {
        const admin = await chat.findFirstAdmin();
        let userRoom = [];

        if (admin) {
          const user = await chat.findProfile(req.user.id);
          const name = `${user?.fullName}`;
          userRoom.push({ userId: req.user.id });
          userRoom.push({ userId: admin.id });

          const msg = await chat.createRoomAdmin(name, req.user.id, userRoom);
          return res.status(201).json(msg);
        }
      }

      //
    } else {
      return res
        .status(200)
        .json({ success: false, msg: "User not authenticated" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}

export async function getMessage(req: Request, res: Response) {
  const { roomId } = req.params;
  try {
    const msg = await chat.getMessage(roomId);
    res.status(200).json(msg);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}

export async function deleteRoomChat(req: Request, res: Response) {
  const { id } = req.params;
  try {
    if (req.user) {
      const msg = await chat.deleteRoomChat(req.user.id, parseInt(id));
      return res.status(201).json(msg);
    } else {
      return res
        .status(200)
        .json({ success: false, msg: "User not authenticated" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}
