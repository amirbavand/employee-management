import "express-async-errors";
import mongoose from "mongoose";
import { User } from "./models/user";
import redis, { RedisClient } from "redis";

import { DatabaseConnectionError } from "./errors/database-connection-error";

import { app } from "./app";

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

  console.log("connected to redis");

  app.listen(3000, () => {
    console.log("Listening on port 3000!!!!!!!!");
  });
};

start();

const a = User.build({ username: "amir", password: "amir" });
a.save();
