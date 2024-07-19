// import { createServer } from "https";
import { createServer } from "http";
import { configDotenv } from "dotenv";
import { readFileSync } from "fs";
import { Server } from "socket.io";
configDotenv();
import app from "./app";
import prisma from "./configs/dbs";

const PORT = process.env.PORT || 8080;

const server = createServer(app);
const io = new Server(server, {
  path: "/chat",
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3001"],
  },
});
io.on("connection", (socket) => {
  console.log("Connection socket" + socket.id);

  socket.on("joinRoom", ({ roomId, userId }) => {
    socket.join(roomId);
    console.log(`User ${userId} joined room ${roomId}`);
  });

  socket.on("chatMessage", async ({ roomId, userId, content }) => {
    console.log(roomId, userId, content);

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

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
server.listen(PORT, function () {
  console.log("Server is running on http://localhost:" + PORT);
});
