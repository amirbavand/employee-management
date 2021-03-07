import express from "express";
import { json } from "body-parser";
import "express-async-errors";

import mongoose from "mongoose";
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import cookieSession from "cookie-session";
import { User } from "./models/user";
import { errorHandler } from "./middle-ware/error-handler";

import { NotFoundError } from "./errors/not-found-error";
import { DatabaseConnectionError } from "./errors/database-connection-error";

const app = express();
app.set("trust proxy", true);

app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);

app.all("*", async (req, res) => {
  console.log("no roote error");
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
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
    throw new DatabaseConnectionError();
  }
  app.listen(3000, () => {
    console.log("Listening on port 3000!!!!!!!!");
  });
};

start();

const a = User.build({ username: "amir", password: "amir" });
a.save();

const b = User.build({ username: "james", password: "james" });
b.save();
