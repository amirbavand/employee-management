import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { signinMock } from "../../test/signin-mock";
import { Employee } from "../../models/employee";

it("should return error by inserting ", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/employees/${id}`)
    .set("Cookie", signinMock())
    .send({
      EmployeeId: "amir",
      Name: "amir",
      Surname: "bavand",
      PhoneNumber: "123456",
      Address: "Canada",
      Title: "software engineer",
    })
    .expect(404);
});

it("returning 401 error by not signing in", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/employees/${id}`)
    .send({
      EmployeeId: "amir",
      Name: "amir",
      Surname: "bavand",
      PhoneNumber: "123456",
      Address: "Canada",
      Title: "software engineer",
    })
    .expect(401);
});

it("returning error 40 by invalid request", async () => {
  const cookie = signinMock();

  const response = await request(app)
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

  await request(app)
    .put(`/api/employees/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      EmployeeId: "amir",
      Name: "",
      Surname: "bavand",
      PhoneNumber: "123456",
      Address: "Canada",
      Title: "software engineer",
    })
    .expect(400);
  await request(app)
    .put(`/api/employees/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      EmployeeId: "amir",
      Name: "",
      Surname: "bavand",
      PhoneNumber: "123456",
      Address: "Canada",
      Title: "software engineer",
    })
    .expect(400);
  await request(app)
    .put(`/api/employees/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      EmployeeId: "amir",
      Name: "",
      Surname: "bavand",
      PhoneNumber: "123456",
      Address: "Canada",
      Title: "software engineer",
    })
    .expect(400);
  await request(app)
    .put(`/api/employees/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      EmployeeId: "amir",
      Name: "",
      Surname: "bavand",
      PhoneNumber: "123456",
      Address: "Canada",
      Title: "software engineer",
    })
    .expect(400);

  await request(app)
    .put(`/api/employees/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      EmployeeId: "",
      Name: "amir",
      Surname: "bavand",
      PhoneNumber: "123456",
      Address: "Canada",
      Title: "software engineer",
    })
    .expect(400);

  await request(app)
    .put(`/api/employees/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      EmployeeId: "amir",
      Name: "amir",
      Surname: "",
      PhoneNumber: "123456",
      Address: "Canada",
      Title: "software engineer",
    })
    .expect(400);

  await request(app)
    .put(`/api/employees/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      EmployeeId: "amir",
      Name: "amir",
      Surname: "bavand",
      PhoneNumber: "",
      Address: "Canada",
      Title: "software engineer",
    })
    .expect(400);

  await request(app)
    .put(`/api/employees/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      EmployeeId: "amir",
      Name: "amir",
      Surname: "bavand",
      PhoneNumber: "123456",
      Address: "",
      Title: "software engineer",
    })
    .expect(400);

  await request(app)
    .put(`/api/employees/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      EmployeeId: "amir",
      Name: "amir",
      Surname: "bavand",
      PhoneNumber: "123456",
      Address: "Canada",
      Title: "",
    })
    .expect(400);
});

it("should return error if try to assign a employee id that exists in the database", async () => {
  const cookie = signinMock();

  const response1 = await request(app)
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

  const response2 = await request(app)
    .post("/api/employees")
    .set("Cookie", cookie)
    .send({
      EmployeeId: "james",
      Name: "james",
      Surname: "james",
      PhoneNumber: "123456",
      Address: "Canada",
      Title: "software engineer",
    });

  await request(app)
    .put(`/api/employees/${response1.body.id}`)
    .set("Cookie", cookie)
    .send({
      EmployeeId: "james",
      Name: "amir",
      Surname: "bavand",
      PhoneNumber: "123456",
      Address: "Canada",
      Title: "Computer Scientist",
    })
    .expect(400);
});

it("edit the emolyee with valid input", async () => {
  const cookie = signinMock();

  const response = await request(app)
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

  await request(app)
    .put(`/api/employees/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      EmployeeId: "amir",
      Name: "amir",
      Surname: "bavand",
      PhoneNumber: "123456",
      Address: "Canada",
      Title: "Computer Scientist",
    })
    .expect(200);

  const employee = await Employee.find({});

  expect(employee[0].EmployeeId).toEqual("amir");
  expect(employee[0].Name).toEqual("amir");
  expect(employee[0].Surname).toEqual("bavand");
  expect(employee[0].PhoneNumber).toEqual("123456");
  expect(employee[0].Address).toEqual("Canada");
  expect(employee[0].Title).toEqual("Computer Scientist");
  expect(employee[0].id).toEqual(response.body.id);
});
