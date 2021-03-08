import mongoose from "mongoose";
import { app } from "./app";
import { DatabaseConnectionError } from "./errors/database-connection-error";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("needing a jwt key");
  }

  try {
    await mongoose.connect("mongodb://mongo-eomployee-service:27017/employee", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("connected to mongodb");
  } catch (error) {
    throw new DatabaseConnectionError();
  }
  app.listen(3000, () => {
    console.log("Listening on port 3000!!!!!!!!!!!!!!!!!!");
  });
};

start();
