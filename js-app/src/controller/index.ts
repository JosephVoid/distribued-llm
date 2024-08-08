import { Request, Response } from "express";
import { requestLLM, saveChat } from "../service";

export const sendChat = async (req: Request, res: Response) => {
  const message = req.body.message;
  const model = req.body.model;

  await saveChat(message, model, "user");

  const modelResponse = await requestLLM(model, message);

  await saveChat(modelResponse, model, "assitant");

  return res.status(200).json(modelResponse);
};

export const getHistory = async (req: Request, res: Response) => {};

export const getConversationDetail = async (req: Request, res: Response) => {};
