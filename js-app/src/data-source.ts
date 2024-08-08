import "reflect-metadata";
import { DataSource } from "typeorm";
import { Chat } from "./entity/Chat";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DBHOST,
  port: +process.env.DBPORT,
  username: process.env.DBUSER,
  password: process.env.DBPASS,
  database: process.env.DBNAME,
  synchronize: true,
  logging: false,
  entities: [Chat],
  migrations: [],
  subscribers: [],
});
