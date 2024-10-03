// import { createServer } from "https";
import { createServer } from "http";
import { configDotenv } from "dotenv";
import { Server } from "socket.io";
import fs from "fs";
configDotenv();
import app from "./app";
import prisma from "./configs/dbs";
import { updateUserStatus } from "./services/userService";
import session from "express-session";
import path from "path";
import sharp from "sharp";
const PORT = process.env.PORT || 8080;
const server = createServer(app);
const io = new Server(server, {
  path: "/chat",
  maxHttpBufferSize: 1e8,
  cors: {
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://taphoazalo.com",
      "https://www.taphoazalo.com",
      "https://admin.taphoazalo.com",
    ],
  },
});

io.on("connection", async (socket) => {
  console.log("User connected!");
  const userId = socket.handshake.query.userId;
  const userIdString = Array.isArray(userId) ? userId[0] : userId;
  if (userIdString) {
    try {
      await updateUserStatus(userIdString, true);
    } catch (error) {
      console.log(error);
    }
  }

  socket.on("joinRoom", ({ roomId, userId }) => {
    socket.join(roomId);
  });

  socket.on("chatMessage", async ({ roomId, userId, content, image }) => {
    if (image) {
      const timestamp = Date.now();
      const fileName = `chat_${roomId}-${timestamp}-${userId}.jpg`;
      const uploadDir = path.join(__dirname, "..", "public", "uploads", "chat");
      const filePath = path.join(uploadDir, fileName);
      const buffer = Buffer.from(image, "base64");
      const compressedImageBuffer = await sharp(buffer)
        .jpeg({ quality: 80 })
        .toBuffer();

      fs.writeFile(filePath, compressedImageBuffer, (err) => {
        if (err) {
          console.error("Error saving image:", err);
        } else {
          console.log("Image saved successfully");
        }
      });
      try {
        const message = await prisma.message.create({
          data: {
            content,
            image: fileName,
            roomId: roomId,
            userId,
          },
        });

        return io.to(roomId).emit("chatMessage", message);
      } catch (error) {
        console.error(error);
      }
    } else
      try {
        const message = await prisma.message.create({
          data: {
            content,
            roomId: roomId,
            userId,
          },
        });

        return io.to(roomId).emit("chatMessage", message);
      } catch (error) {
        console.error(error);
      }
  });

  socket.on("disconnect", async () => {
    if (userIdString) {
      try {
        await updateUserStatus(userIdString, false);
      } catch (error) {
        console.log(error);
      }
    }

    console.log("User disconnected");
  });
});
server.listen(PORT, function () {
  console.log("Server is running on http://localhost:" + PORT);
});
