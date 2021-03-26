import express from "express";
import jwt from "jsonwebtoken";
import redis from "redis";

const router = express.Router();
const redisClient = redis.createClient({
  port: 6379,
  host: "redis-depl-service",
});

redisClient.on("connect", function () {
  console.log("connected");
});
redisClient.on("error", function (error) {
  console.error(error, "this is error");
});

router.post("/api/users/signout", async (req, res) => {
  if (req.session?.jwt) {
    console.log("this is valid");

    try {
      const isValid = jwt.verify(req.session.jwt, process.env.JWT_KEY!);
      console.log(redisClient);
      await redisClient.set(req.session.jwt, "true");
      console.log(redisClient.get(req.session.jwt), "this is key");

      console.log(isValid, "this is valid");
    } catch (err) {}
  }

  console.log(req.session);
  req.session = null;

  res.send({});
});

export { router as signoutRouter };
