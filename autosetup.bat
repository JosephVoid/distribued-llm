@echo off

set /p DB_PSS=Enter DB password: 

if not exist js-app mkdir js-app
echo DBHOST=mysqldb > js-app\.env
echo DBUSER=root >> js-app\.env
echo DBPORT=3306 >> js-app\.env
echo DBNAME=hyperhire >> js-app\.env
echo DBPASS=%DB_PSS% >> js-app\.env
echo PY_SERVICE_URL=http://pyapi:5000 >> js-app\.env
echo Created .env file in js-app

if not exist py-app mkdir py-app
set /p LLMA_TOKEN=Enter LLAMA API token: 
echo LLMA=%LLMA_TOKEN% > py-app\.env
echo Created .env file in py-app

echo DB_NAME=hyperhire > .env
echo DB_PASS=%DB_PSS% >> .env
echo Created .env file in the current working directory
