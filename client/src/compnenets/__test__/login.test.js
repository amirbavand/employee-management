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

it("has a submit button", () => {
  expect(component.find("form").length).toEqual(1);
  expect(component.find("button").length).toEqual(1);
  expect(component.find("input").length).toEqual(2);
});
