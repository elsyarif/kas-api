import http from "http";
import express, { Application, Request, Response } from "express";
import * as socket from "socket.io";
import cors from "cors";

import morgan from "morgan";
import dotenv from "dotenv";
import routes from "./routes";
dotenv.config();

const app: Application = express();
const PORT = Number(process.env.NODE_PORT) | 5000;

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use(routes);

const server = http.createServer(app);
const io = new socket.Server(server);

export { io };

io.on("connection", (socket) => {
  console.log("io server connected");

  socket.on("disconnect", () => {
    console.log("io server disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});