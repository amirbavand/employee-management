import request from "supertest";
import { app } from "../app";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export function signinMock(): string[] {
  const toBeSigned = {
    id: new mongoose.Types.ObjectId().toHexString(),
    username: "amir",
  };
  const token = jwt.sign(toBeSigned, process.env.JWT_KEY!);
  const session = { jwt: token };
  const sessionJSON = JSON.stringify(session);
  const base64 = Buffer.from(sessionJSON).toString("base64");
  return ["express:sess=" + base64];
}

//export { signin };
