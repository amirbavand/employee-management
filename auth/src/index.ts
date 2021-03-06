import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import mongoose from "mongoose";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);

app.all("*", async (req, res) => {
  throw new Error();
});

const start = async () => {
  try {
    await mongoose.connect(
      "mongodb://mongo-authentication-service:27017/auth",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }
    );
    console.log("Connected to MongoDb");
  } catch (err) {
    console.error(err);
  }
};

start();
