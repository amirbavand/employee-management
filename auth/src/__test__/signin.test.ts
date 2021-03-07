import request from "supertest";
import { app } from "../../src/app";

it("it should fail when username is wrong", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({
      username: "wrongusername",
      password: "password",
    })
    .expect(401);
});

it("it should fail when password is wrong", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({
      username: "amir",
      password: "password",
    })
    .expect(401);
});

it("it should pass when password and username both are correct", async () => {
  const response = await request(app)
    .post("/api/users/signin")
    .send({
      username: "amir",
      password: "amir",
    })
    .expect(200);

  expect(response.get("Set-Cookie")).toBeDefined();
});
