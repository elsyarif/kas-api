import express from "express";
import { createAttende } from "../modules/Attence/attendeController";

const routes = express.Router();

routes.post("/api/attende", createAttende);

export default routes;
