import { createUsers } from "../functions.js";
import express from "express";
import bcrypt from "bcrypt"

const router = express.Router();

async function genPassword(password){
  password.bcrypt.genSalt(10)
}

router.post("/signup", async function (req, res) {
  const { username, password } = req.body;
  const hashedPassword = 
  const result = await createUsers(data);
  res.send(result);
});

export const usersRouter = router;
