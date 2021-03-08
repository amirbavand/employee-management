import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { signinMock } from "../../test/signin-mock";

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
