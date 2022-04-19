// const express = require("express");
import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

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
const client = await createConnection();

app.get("/check", function (req, res) {
  res.send("failed");
});

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/movies", async function (req, res) {
  const mov = await client.db("b30").collection("movies").find({}).toArray();
  console.log(mov);
  res.send(mov);
});

app.get("/movies/:id", async function (req, res) {
  const { id } = req.params;
  const movie = await client.db("b30").collection("movies").findOne({ id });
  movie ? res.send(movie) : res.status(404).send("Data not found!");
});

app.delete("/movies/:id", async function (req, res) {
  const { id } = req.params;
  const result = await client
    .db("b30")
    .collection("movies")
    .deleteOne({ id: id });
  res.send(result);
});

app.put("/movies/:id", async function (req, res) {
  const { id } = req.params;
  const update = req.body;
  const result = await client
    .db("b30")
    .collection("movies")
    .updateOne({ id: id }, { $set: update });
  res.send(result);
});

app.post("/movies", async function (req, res) {
  const data = req.body;
  console.log(data);
  const result = await client.db("b30").collection("movies").insertMany(data);
  res.send(result);
});

app.listen(PORT, () => console.log("sever started"));
