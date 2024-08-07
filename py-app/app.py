import json
import sys
import os
from llamaapi import LlamaAPI
from dotenv import load_dotenv
from memory import Memory

# load the .env file
dotenv_path = os.path.join(os.path.dirname(__file__), "..", ".env")
load_dotenv(dotenv_path)

# Setup Recalling
persiter = Memory()

# Setup LLMA
llama = LlamaAPI(os.getenv("LLMA"))


def request_model(prompt: str, model: str) -> str:
    persiter.remember("user", prompt)
    try:
        # Build the API request
        api_request_json = {"model": model, "messages": persiter.parse_to_json()}
        # Execute the Request
        response = llama.run(api_request_json)
        # Parse Response
        json_response = response.json()
        # Recall and return
        model_response = json_response["choices"][0]["message"]["content"]
        persiter.remember("assitant", model_response)
        return model_response
    except Exception as inst:
        print(inst)
        return "Error"


print(
    f"\tWelcome to my submission, Yoseph Tenaw\n\tLet's Start by selecting a model\n\n\t1.llama\t\t2.mistral\n\t-------------------------\n"
)

chosen_model_num = input()
if chosen_model_num == "1":
    model = "llama3-70b"
else:
    model = "mistral-7b-instruct"

print("\tNow lets chat with {}, type exist to quit".format(model))
print("Write your message")

for line in sys.stdin:
    command = line.strip()
    if command == "exit":
        sys.exit()
    model_response = request_model(command, model)
    print("\tModel Response: ", model_response)
