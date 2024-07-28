// import { createServer } from "https";
import { createServer } from "http";
import { configDotenv } from "dotenv";
import { Server } from "socket.io";
configDotenv();
import app from "./app";
import prisma from "./configs/dbs";
import { updateUserStatus } from "./services/userService";

const PORT = process.env.PORT || 8080;

const server = createServer(app);
const io = new Server(server, {
  path: "/chat",
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
  console.log("User connected");
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

  socket.on("chatMessage", async ({ roomId, userId, content }) => {
    try {
      const message = await prisma.message.create({
        data: {
          content,
          roomId: parseInt(roomId),
          userId,
        },
      });

      io.to(roomId).emit("chatMessage", message);
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
