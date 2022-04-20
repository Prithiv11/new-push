import { client } from "./index.js";

export async function updateMovie(id, update) {
  return await client
    .db("b30")
    .collection("movies")
    .updateOne({ id: id }, { $set: update });
}

export async function findAllMovies() {
  return await client.db("b30").collection("movies").find({}).toArray();
}

export async function getMovie(id) {
  return await client.db("b30").collection("movies").findOne({ id });
}

export async function deleteMovie(id) {
  return await client.db("b30").collection("movies").deleteOne({ id: id });
}

export async function createMovies(data) {
  return await client.db("b30").collection("movies").insertMany(data);
}

export async function createUsers(data) {
  return await client.db("b30").collection("users").insertOne(data);
}
