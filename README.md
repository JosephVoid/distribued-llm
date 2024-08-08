# Distribued LLM

## Setup Instruction

1. Run autosetup either for windows or linux
2. Then run `docker compose up -d --no-deps --build node pyapi mysqldb`
3. Send requests to `localhost:3000`
   - Available endpoints
   ```
   POST /chat -> body {model: <either llama3-70b or mistral-7b-instruct>, message: <content to send to model>} : To chat with the model
   GET /history : To get the conversation history
   GET /conversation/<conversation_id> : To get all the chats in a conversation
   POST /clear : To clear local memory
   ```

## If the auto setup doesn't work for some case do the following

1. Create `.env` file in `/js-app`, `py-app` and at the root directory
2. Paste the below template on

   ```
   /py-app/.env
   LLMA=<LLAMA API key>

   /js-app/.env
   DBHOST=mysqldb
   DBUSER=root
   DBPORT=3306
   DBNAME=hyperhire
   DBPASS=<Database password>
   PY_SERVICE_URL=http://pyapi:5000

   /.env
   DB_NAME=hyperhire
   DB_PASS=<Same database password as before>
   ```

3. Then run `docker compose up -d --no-deps --build node pyapi mysqldb`

## Optional: The python CLI

If you want to use the python cli

1. `cd py-app`
2. `docker build -t pycli . && docker run -it pycli`
