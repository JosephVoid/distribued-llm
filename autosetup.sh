#!/bin/bash

mkdir -p ./py-app
echo -n "Paste LLAMA API token: "
read LLMA_TOKEN
cat <<EOL > ./py-app/.env
LLMA=$LLMA_TOKEN
EOL
echo "Created .env file in /py-app"

echo -n "Enter db pass: "
read DB_PSS

mkdir -p ./js-app
cat <<EOL > ./js-app/.env
DBHOST=mysqldb
DBUSER=root
DBPORT=3306
DBNAME=hyperhire
DBPASS=$DB_PSS
PY_SERVICE_URL=http://pyapi:5000
EOL
echo "Created .env file in /js-app"

cat <<EOL > ./.env
DB_NAME=hyperhire
DB_PASS=$DB_PSS
EOL
echo "Created .env file in the current working directory"
