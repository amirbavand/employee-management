import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { signinMock } from "../../test/signin-mock";
import { Employee } from "../../models/employee";

it("returning 401 error by not signing in", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app).get("/api/employees").send({}).expect(401);
});

it("successfuly list the entire emolyees ", async () => {
  const cookie = signinMock();

  const employee1 = await request(app)
    .post("/api/employees")
    .set("Cookie", cookie)
    .send({
      EmployeeId: "amir",
      Name: "amir",
      Surname: "bavand",
      PhoneNumber: "123456",
      Address: "Canada",
      Title: "software engineer",
    });
  const employee2 = await request(app)
    .post("/api/employees")
    .set("Cookie", cookie)
    .send({
      EmployeeId: "james",
      Name: "james",
      Surname: "bavand",
      PhoneNumber: "123456",
      Address: "Canada",
      Title: "software engineer",
    });
  let employees = await Employee.find({});
  expect(employees.length).toEqual(2);

  const response = await request(app)
    .get("/api/employees")
    .set("Cookie", signinMock())
    .send({})
    .expect(200);

  expect(response.body.length).toEqual(2);
});

it("successfuly list the filtered emolyees ", async () => {
  const cookie = signinMock();

  const employee1 = await request(app)
    .post("/api/employees")
    .set("Cookie", cookie)
    .send({
      EmployeeId: "amir",
      Name: "amir",
      Surname: "bavand",
      PhoneNumber: "123456",
      Address: "Canada",
      Title: "software engineer",
    });
  const employee2 = await request(app)
    .post("/api/employees")
    .set("Cookie", cookie)
    .send({
      EmployeeId: "james",
      Name: "james",
      Surname: "bavand",
      PhoneNumber: "123456",
      Address: "Canada",
      Title: "software engineer",
    });

  const employee3 = await request(app)
    .post("/api/employees")
    .set("Cookie", cookie)
    .send({
      EmployeeId: "craig",
      Name: "james",
      Surname: "bavand",
      PhoneNumber: "123456",
      Address: "Canada",
      Title: "computer scientist ",
    });
  let employees = await Employee.find({});
  expect(employees.length).toEqual(3);

  const response = await request(app)
    .get("/api/employees/?Title=software engineer")
    .set("Cookie", signinMock())
    .send({})
    .expect(200);

  expect(response.body.length).toEqual(2);
});
