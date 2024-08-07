from typing import List
import os
import json


class Chat:
    role: str
    content: str

    def __init__(self, role: str, content: str):
        self.role = role
        self.content = content

    def to_dict(self):
        return {"role": self.role, "content": self.content}


class Memory:
    def __init__(self, recall=True) -> None:
        if not recall:
            if os.path.exists("context.txt"):
                os.remove("context.txt")
        if not os.path.exists("context.txt"):
            with open("context.txt", "w") as file:
                file.write("")

    def remember(self, role, content):
        with open("context.txt", "a") as file:
            file.write(f"role: {role} content: {content}\n")

    def getContext(self) -> List[Chat]:
        try:
            chats = []
            with open("context.txt", "r") as file:
                for line in file:
                    line = line.strip()
                    if line:
                        parts = line.split(" content: ")
                        role_part = parts[0].strip()
                        message_part = parts[1].strip()

                        if role_part.startswith("role: "):
                            role = role_part[len("role: ") :].strip()
                        else:
                            continue  # Skip if 'role: ' is not present

                        # Use the message part directly
                        message = message_part

                        # Create a Chat object and append it to the list
                        chats.append(Chat(role, message))
            return chats
        except Exception as exec:
            print("EXEC", exec)
            return []

    def parse_to_json(self):
        chats = self.getContext()
        chat_dicts = [chat.to_dict() for chat in chats]
        return chat_dicts
