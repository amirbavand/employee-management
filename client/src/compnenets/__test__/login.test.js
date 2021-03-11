import React from "react";
import ReactDom from "react-dom";
import Login from "../login/login";
import { mount } from "enzyme";
import axios from "axios";

let component;

beforeEach(() => {
  component = mount(<Login />);
});

afterEach(() => {
  component.unmount();
});

it("has a submit button and two inputs which are all in a form", () => {
  expect(component.find("form").length).toEqual(1);
  expect(component.find("button").length).toEqual(1);
  expect(component.find("input").length).toEqual(2);
});

it("should give error when we do not insert password", () => {
  component.find("#username").simulate("change", { target: { value: "amir" } });
  component.update();
  component.find("form").simulate("submit");
  component.update();

  expect(component.find("#warning-password").text()).toEqual(
    "Password is empty"
  );
});

it("should give error when we do not insert username", () => {
  component.find("#password").simulate("change", { target: { value: "amir" } });
  component.update();
  component.find("form").simulate("submit");
  component.update();

  expect(component.find("#warning-username").text()).toEqual(
    "Username is empty"
  );
});

it("should give two  errors when we do not insert password", () => {
  component.update();
  component.find("form").simulate("submit");
  component.update();

  expect(component.find("#warning-username").text()).toEqual(
    "Username is empty"
  );
  expect(component.find("#warning-password").text()).toEqual(
    "Password is empty"
  );
});

it("should go to catch block", async () => {
  await axios.post.mockRejectedValueOnce();

  component.find("#username").simulate("change", { target: { value: "amir" } });

  component.find("#password").simulate("change", { target: { value: "amir" } });

  component.find("form").simulate("submit");
  component.update();
  await new Promise((r) => setTimeout(r, 200));

  expect(component.find("#warning-username").text()).toEqual("");
  expect(component.find("#warning-password").text()).toEqual("");
  expect(component.find("#warning-general").text()).toEqual(
    "username or password is incorect"
  );
});

it("should go to list page", async () => {
  await axios.post.mockResolvedValueOnce();

  component.find("#username").simulate("change", { target: { value: "amir" } });

  component.find("#password").simulate("change", { target: { value: "amir" } });

  component.find("form").simulate("submit");
  component.update();
  await new Promise((r) => setTimeout(r, 200));

  expect(component.find("#warning-username").text()).toEqual("");
  expect(component.find("#warning-password").text()).toEqual("");
  expect(component.find("#warning-general").text()).toEqual("");
});
