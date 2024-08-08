import sys
import os
from llamaapi import LlamaAPI
from dotenv import load_dotenv
from memory import Memory
from flask import Flask, request, jsonify

# load the .env file
load_dotenv()

# Setup Recalling
if len(sys.argv) > 2:
    mem = sys.argv[2]
    if mem == "recall":
        persiter = Memory()
    else:
        persiter = Memory(False)
else:
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


def run_cli():
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


def run_api():
    app = Flask(__name__)

    @app.route("/request-model", methods=["POST"])
    def request_endpoint():
        if not request.is_json:
            return jsonify({"error": "Request must be JSON"}), 400

        data = request.get_json()
        model_response = request_model(data["message"], data["model"])
        return jsonify(model_response), 200

    @app.route("/clear", methods=["POST"])
    def clear_endpoint():
        with open("context.txt", "r+") as file:
            file.truncate(0)
        return jsonify({"status": "Success"}), 200

    return app


def main():
    if len(sys.argv) < 2:
        print("Usage: py app.py <mode>")
        sys.exit(1)

    mode = sys.argv[1]

    if mode == "cli":
        run_cli()
    elif mode == "api":
        app = run_api()
        app.run(debug=True)
    else:
        print("Invalid mode specified. Use 'cli' or 'api'.")
        sys.exit(1)


if __name__ == "__main__":
    main()
