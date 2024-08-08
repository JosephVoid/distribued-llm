import { AppDataSource } from "./data-source";
import dotenv from "dotenv";
import express from "express";
import routes from "./routes";
import bodyParser from "body-parser";

dotenv.config();

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    const port = 3000;

    app.use(bodyParser.json());
    app.use(routes);

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => console.log(error));
