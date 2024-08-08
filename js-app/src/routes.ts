import { Router } from "express";
import {
  sendChat,
  getHistory,
  getConversationDetail,
  clearMemory,
} from "./controller";

const routes = Router();

routes.post("/chat", sendChat);
routes.get("/history", getHistory);
routes.get("/conversation/:id", getConversationDetail);
routes.post("/clear-memory", clearMemory);

export default routes;
