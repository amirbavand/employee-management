import React from "react";
import ReactDom from "react-dom";
import Login from "../login/login";
import { mount } from "enzyme";

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

it("simulate the valid event", () => {
  component.find("#username").simulate("change", { target: { value: "amir" } });
  component.update();
  expect(component.find("#warning-username").text()).toEqual("");
});
