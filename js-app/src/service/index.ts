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
    const response = await axios.post(
      process.env.PY_SERVICE_URL + "/request-model",
      body
    );
    return response.data as string;
  } catch (error) {
    console.error(error);
    return "Error";
  }
};

export const groupChatsByConversationId = async () => {
  const chat = new Chat();
  const chatRepo = AppDataSource.getRepository(Chat);

  const chats = await chatRepo.find({
    order: { datetime: "DESC" },
  });
  const group = [];
  chats.forEach((c) => {
    if (!group.find((it) => it.conv_id === c.conversation_id)) {
      group.push({
        conv_id: c.conversation_id,
        datetime: c.datetime,
        lastchat: c.message,
      });
    }
  });

  return group;
};

export const getAllChats = async (id: string) => {
  const chatRepo = AppDataSource.getRepository(Chat);

  const chats = await chatRepo.find({ where: { conversation_id: id } });
  return chats;
};
