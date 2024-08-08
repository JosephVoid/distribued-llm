import { AppDataSource } from "../data-source";
import { Chat } from "../entity/Chat";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { sameConvo } from "../utils";

export const saveChat = async (
  message: string,
  model: string,
  actor: "user" | "assitant"
) => {
  try {
    const chat = new Chat();
    const chatRepo = AppDataSource.getRepository(Chat);

    const [lastChat] = await chatRepo.find({
      order: { datetime: "DESC" },
      take: 1,
    });

    chat.from = actor;
    chat.model = model;
    chat.message = message;
    // If the chat are close together they are the same conversation
    chat.conversation_id = sameConvo(lastChat?.datetime ?? null, new Date())
      ? lastChat.conversation_id
      : uuidv4();
    chat.datetime = new Date();

    await chatRepo.save(chat);
  } catch (error) {
    console.error(error);
  }
};

export const requestLLM = async (model: string, message: string) => {
  try {
    const body = { model, message };
    const response = await axios.post(process.env.PY_SERVICE_URL, body);
    return response.data as string;
  } catch (error) {
    console.error(error);
    return "Error";
  }
};
