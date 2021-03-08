import request from "supertest";
import { app } from "../../app";
import { signinMock } from "../../test/signin-mock";
import { Employee } from "../../models/employee";

it("prevent before signing in", async () => {
  const response = await request(app)
    .post("/api/employees")
    .send({})
    .expect(401);
});

it("returns error by insering invalid input", async () => {
  await request(app)
    .post("/api/employees")
    .set("Cookie", signinMock())
    .send({
      EmployeeId: "",
      Name: "amir",
      Surname: "amir",
      PhoneNumber: "123456",
      Address: "Canada",
      Title: "engineer",
    })
    .expect(400);

  await request(app)
    .post("/api/employees")
    .set("Cookie", signinMock())
    .send({
      EmployeeId: "amir",
      Name: "",
      Surname: "amir",
      PhoneNumber: "123456",
      Address: "Canada",
      Title: "engineer",
    })
    .expect(400);

  await request(app)
    .post("/api/employees")
    .set("Cookie", signinMock())
    .send({
      EmployeeId: "james",
      Name: "james",
      Surname: 123,
      PhoneNumber: "123456",
      Address: "Canada",
      Title: "engineer",
    })
    .expect(400);

  await request(app)
    .post("/api/employees")
    .set("Cookie", signinMock())
    .send({
      EmployeeId: "alice",
      Name: "amir",
      Surname: 123,
      PhoneNumber: "",
      Address: "Canada",
      Title: "engineer",
    })
    .expect(400);

  await request(app)
    .post("/api/employees")
    .set("Cookie", signinMock())
    .send({
      EmployeeId: "joe",
      Name: "amir",
      Surname: "joe",
      PhoneNumber: "123456",
      Address: "",
      Title: "engineer",
    })
    .expect(400);

  await request(app)
    .post("/api/employees")
    .set("Cookie", signinMock())
    .send({
      EmployeeId: "donald",
      Name: "amir",
      Surname: "donald",
      PhoneNumber: "123456",
      Address: "Canada",
      Title: "",
    })
    .expect(400);
});

it("creates a employee with valid inputs", async () => {
  let employees = await Employee.find({});
  expect(employees.length).toEqual(0);

  await request(app)
    .post("/api/employees")
    .set("Cookie", signinMock())
    .send({
      EmployeeId: "amir",
      Name: "amir",
      Surname: "bavand",
      PhoneNumber: "123456",
      Address: "Canada",
      Title: "software engineer",
    })
    .expect(201);

  employees = await Employee.find({});
  expect(employees.length).toEqual(1);
  expect(employees[0].EmployeeId).toEqual("amir");
  expect(employees[0].Name).toEqual("amir");
  expect(employees[0].Surname).toEqual("bavand");
  expect(employees[0].PhoneNumber).toEqual("123456");
  expect(employees[0].Address).toEqual("Canada");
  expect(employees[0].Title).toEqual("software engineer");
});

it("trying to create two employee with same employee id should return error", async () => {
  let employees = await Employee.find({});
  expect(employees.length).toEqual(0);

  await request(app)
    .post("/api/employees")
    .set("Cookie", signinMock())
    .send({
      EmployeeId: "amir",
      Name: "amir",
      Surname: "bavand",
      PhoneNumber: "123456",
      Address: "Canada",
      Title: "software engineer",
    })
    .expect(201);

  await request(app)
    .post("/api/employees")
    .set("Cookie", signinMock())
    .send({
      EmployeeId: "amir",
      Name: "amir",
      Surname: "bavand",
      PhoneNumber: "123456",
      Address: "Canada",
      Title: "software engineer",
    })
    .expect(400);
});
