import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { signinMock } from "../../test/signin-mock";
import { Employee } from "../../models/employee";

it("should return error by inserting wrong employee", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .delete(`/api/employees/${id}`)
    .set("Cookie", signinMock())
    .send({})
    .expect(404);
});

it("returning 401 error by not signing in", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app).delete(`/api/employees/${id}`).send({}).expect(401);
});

it("successfuly delete the emolyee with valid input", async () => {
  const cookie = signinMock();

  const response = await request(app)
    .post("/api/employees")
    .set("Cookie", cookie)
    .send({
      EmployeeId: "amir",
      Name: "amir",
      Surename: "bavand",
      PhoneNumber: "123456",
      Address: "Canada",
      Title: "software engineer",
    });
  let employees = await Employee.find({});
  expect(employees.length).toEqual(1);

  await request(app)
    .delete(`/api/employees/${response.body.id}`)
    .set("Cookie", signinMock())
    .send({})
    .expect(200);

  employees = await Employee.find({});
  expect(employees.length).toEqual(0);
});
