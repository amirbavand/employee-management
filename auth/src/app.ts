import express from "express";
import { json } from "body-parser";
import "express-async-errors";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { currentUser } from "./routes/currentuser";
import cookieSession from "cookie-session";
import { errorHandler } from "./middle-ware/error-handler";
import { NotFoundError } from "./errors/not-found-error";

const app = express();
app.set("trust proxy", true);

app.use(json());
app.use(
  cookieSession({
    name: "jwt",
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.use(signinRouter);
app.use(signoutRouter);
app.use(currentUser);
app.all("*", async (req, res) => {
  console.log("no roote error");
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
