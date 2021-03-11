import React from "react";
import ReactDom from "react-dom";
import Add from "../add/add";
import { mount } from "enzyme";
import checkLogin from "../../utils/check-login";
import axios from "axios";

let component;

beforeEach(async () => {
  // checkLogin.isLogin = await jest.fn().mockResolvedValueOnce(true);

  component = mount(<Add />);
});

afterEach(() => {
  component.unmount();
});

it("has a submit button and six inputs which are all in a form", async () => {
  expect(component.find("form").length).toEqual(1);
  expect(component.find("button").length).toEqual(1);
  expect(component.find("input").length).toEqual(6);
});

it("should give error when we do not insert a filed", () => {
  component.find("form").simulate("submit");
  component.update();

  expect(component.find("#warning-EmployeeId").text()).toEqual(
    "pelase enter Employee Id"
  );
  expect(component.find("#warning-Name").text()).toEqual("pelase enter Name");
  expect(component.find("#warning-Surename").text()).toEqual(
    "pelase enter Surename"
  );
  expect(component.find("#warning-PhoneNumber").text()).toEqual(
    "pelase enter Phone Number"
  );
  expect(component.find("#warning-Address").text()).toEqual(
    "pelase enter Address"
  );
  expect(component.find("#warning-Title").text()).toEqual("pelase enter Title");
});

it("should go to catch block", async () => {
  await axios.post.mockRejectedValueOnce();

  component
    .find("#EmployeeId")
    .simulate("change", { target: { value: "amir" } });
  component.find("#Name").simulate("change", { target: { value: "amir" } });
  component.find("#Surename").simulate("change", { target: { value: "amir" } });
  component
    .find("#PhoneNumber")
    .simulate("change", { target: { value: "amir" } });
  component.find("#Address").simulate("change", { target: { value: "amir" } });
  component.find("#Title").simulate("change", { target: { value: "amir" } });

  component.find("form").simulate("submit");
  component.update();
  await new Promise((r) => setTimeout(r, 200));
  expect(component.find("#warning-EmployeeId").text()).toEqual("");
  expect(component.find("#warning-Name").text()).toEqual("");
  expect(component.find("#warning-Surename").text()).toEqual("");
  expect(component.find("#warning-PhoneNumber").text()).toEqual("");
  expect(component.find("#warning-Address").text()).toEqual("");
  expect(component.find("#warning-Title").text()).toEqual("");

  expect(component.find("#warning-general").text()).toEqual(
    "employee already exists"
  );
});

it("should go to list page", async () => {
  await axios.post.mockResolvedValueOnce();

  component
    .find("#EmployeeId")
    .simulate("change", { target: { value: "amir" } });
  component.find("#Name").simulate("change", { target: { value: "amir" } });
  component.find("#Surename").simulate("change", { target: { value: "amir" } });
  component
    .find("#PhoneNumber")
    .simulate("change", { target: { value: "amir" } });
  component.find("#Address").simulate("change", { target: { value: "amir" } });
  component.find("#Title").simulate("change", { target: { value: "amir" } });

  component.find("form").simulate("submit");
  component.update();
  await new Promise((r) => setTimeout(r, 200));
  expect(component.find("#warning-EmployeeId").text()).toEqual("");
  expect(component.find("#warning-Name").text()).toEqual("");
  expect(component.find("#warning-Surename").text()).toEqual("");
  expect(component.find("#warning-PhoneNumber").text()).toEqual("");
  expect(component.find("#warning-Address").text()).toEqual("");
  expect(component.find("#warning-Title").text()).toEqual("");

  expect(component.find("#warning-general").text()).toEqual("");
});
