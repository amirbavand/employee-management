import express from "express";
import { json } from "body-parser";
import "express-async-errors";
import cookieSession from "cookie-session";
import { errorHandler } from "./middle-ware/error-handler";
import { addEmployeeRouter } from "./routes/add";
import { EditEmployeeRouter } from "./routes/edit";
import { DeleteEmployeeRouter } from "../src/routes/delete";
import { ListEmployeeRouter } from "../src/routes/list";
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

app.use(addEmployeeRouter);
app.use(EditEmployeeRouter);
app.use(DeleteEmployeeRouter);
app.use(ListEmployeeRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
