import { Router } from "express";
import { sendChat, getHistory, getConversationDetail } from "./controller";

const routes = Router();

routes.post("/chat", sendChat);
routes.get("/history", getHistory);
routes.get("/conversation/:id", getConversationDetail);

export default routes;
