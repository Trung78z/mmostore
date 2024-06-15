import http from "http";
import { configDotenv } from "dotenv";
import app from "./app";
configDotenv();

const PORT = process.env.PORT || 8080;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
