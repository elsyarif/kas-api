import express from "express";
import {
  createAttende,
  getAttende,
  removeAttende,
} from "../modules/Attence/attendeController";

const routes = express.Router();

routes.post("/api/attende", createAttende);
routes.get("/api/attende", getAttende);
routes.delete("/api/attende/:id", removeAttende);

export default routes;
