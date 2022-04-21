import {
  updateMovie,
  findAllMovies,
  getMovie,
  deleteMovie,
  createMovies,
} from "../functions.js";
import express from "express";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, async function (req, res) {
  const mov = await findAllMovies();
  res.send(mov);
});

router.get("/:id", async function (req, res) {
  const { id } = req.params;
  const movie = await getMovie(id);
  movie ? res.send(movie) : res.status(404).send("Data not found!");
});

router.delete("/:id", async function (req, res) {
  const { id } = req.params;
  const result = await deleteMovie(id);
  res.send(result);
});

router.put("/:id", async function (req, res) {
  const { id } = req.params;
  const update = req.body;
  const result = await updateMovie(id, update);
  res.send(result);
});

router.post("/", async function (req, res) {
  const data = req.body;
  const result = await createMovies(data);
  res.send(result);
});

export const moviesRouter = router;
