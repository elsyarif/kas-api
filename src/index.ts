import "reflect-metadata";
import http from "http";
import express, { Application, Request, Response } from "express";
import socket from "socket.io";

import cors from "cors";

import morgan from "morgan";
import dotenv from "dotenv";
import routes from "./routes";
dotenv.config();

import { createConnection } from "typeorm";

createConnection()
  .then(async (connection) => {})
  .catch((error) => console.log("TypeORM connection error: ", error));

const app: Application = express();
const PORT = Number(process.env.NODE_PORT) | 5000;

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

const server = http.createServer(app);
const io = new socket.Server(server, {
  transports: ["polling"],
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log(`io server connected ${socket.id} `);

  socket.on("message", (message) => {
    console.log(`message from ${socket.id} : ${message}`);
  });

  socket.on("disconnect", () => {
    console.log("io server disconnected");
  });
});

export { io };

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use(routes);

server.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
