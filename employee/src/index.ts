import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("needing a jwt key");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("uri must be defined");
  }
  try {
    await mongoose.connect("mongodb://mongo-eomployee-service:27017/employee", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("connected to mongodb");
  } catch (error) {
    console.log("problem with database, cannot connect");
  }
  app.listen(3000, () => {
    console.log("Listening on port 3000!!!!!!!!!!!!!!!!!!");
  });
};

start();
