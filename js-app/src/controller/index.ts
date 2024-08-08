import { Request, Response } from "express";
import {
  getAllChats,
  groupChatsByConversationId,
  requestLLM,
  saveChat,
} from "../service";
import axios from "axios";

export const sendChat = async (req: Request, res: Response) => {
  const message = req.body.message;
  const model = req.body.model;

  await saveChat(message, model, "user");

  const modelResponse = await requestLLM(model, message);

  await saveChat(modelResponse, model, "assitant");

  return res.status(200).json(modelResponse);
};

export const getHistory = async (req: Request, res: Response) => {
  const groupedChats = await groupChatsByConversationId();
  return res.status(200).json(groupedChats);
};

export const getConversationDetail = async (req: Request, res: Response) => {
  const id = req.params.id;
  const chats = await getAllChats(id);
  return res.status(200).json(chats);
};

export const clearMemory = async (req: Request, res: Response) => {
  try {
    const resp = await axios.post(process.env.PY_SERVICE_URL + "/clear");
    return res.status(200).json(resp);
  } catch (error) {
    console.log(error);
  }
};
