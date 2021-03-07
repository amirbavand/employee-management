import express from "express";
import { json } from "body-parser";
import "express-async-errors";
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import cookieSession from "cookie-session";
import { errorHandler } from "./middle-ware/error-handler";
import { NotFoundError } from "./errors/not-found-error";

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

export { app };
