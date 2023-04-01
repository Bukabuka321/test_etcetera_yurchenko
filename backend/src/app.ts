import express, { json } from "express";

import cors from "cors";

import dotenv from "dotenv";

import { rssParser } from "./rssParser";
dotenv.config();
const EXPRESS_PORT = parseInt(process.env.EXPRESS_PORT ?? "5005", 10);

const app = express();

app.use(cors());
app.use(json());

app.get("/api/feed", rssParser);

app.listen(EXPRESS_PORT, () => {
  console.log("Express listening on port", EXPRESS_PORT);
});
