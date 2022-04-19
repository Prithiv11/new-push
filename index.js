import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import { moviesRouter } from "./routes/movies.js";

const app = express();
dotenv.config();
const PORT = 4000;
const MONGO_URL = process.env.MONGO_URL;
app.use(express.json());

async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Mongo is connected ✌️😊");
  return client;
}
export const client = await createConnection();

app.get("/", function (req, res) {
  res.send("Hello World");
});
app.use("/movies", moviesRouter);

app.listen(PORT, () => console.log("sever started"));
