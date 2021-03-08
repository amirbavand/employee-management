import React from "react";
import ReactDom from "react-dom";
import Login from "../login/login";
import { mount } from "enzyme";

it("has a submit button", () => {
  const component = mount(<Login />);
  expect(component.find("form").length).toEqual(1);
  expect(component.find("button").length).toEqual(1);
});
