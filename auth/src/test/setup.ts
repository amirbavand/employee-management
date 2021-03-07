import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";
import { User } from "../../src/models/user";

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = "amir";

  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
  const user = await User.build({
    username: "amir",
    password: "amir",
  });
  await user.save();
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});
