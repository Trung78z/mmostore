// import { createServer } from "https";
import { createServer } from "http";
import { configDotenv } from "dotenv";
import { readFileSync } from "fs";
configDotenv();
import app from "./app";

const PORT = process.env.PORT || 8080;
// const server = createServer(
//   {
//     cert: readFileSync(__dirname + "/keys/trungdev.com_cert.pem"),
//     key: readFileSync(__dirname + "/keys/trungdev.com_key.pem"),
//   },
//   app
// );
const server = createServer(app);
server.listen(PORT, function () {
  console.log("Server is running on http://localhost:" + PORT);
});
