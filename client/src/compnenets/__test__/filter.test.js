import React from "react";
import ReactDom from "react-dom";
import Add from "../add/add";
import { mount } from "enzyme";
import checkLogin from "../../utils/check-login";
import axios from "axios";
import Filter from "../filter/filter";

let component;

beforeEach(async () => {
  const onSubmit = () => {};

  // checkLogin.isLogin = await jest.fn().mockResolvedValueOnce(true);

  component = mount(<Filter handleFileterSubmit={onSubmit} />);
});

afterEach(() => {
  component.unmount();
});

function flushPromises() {
  return new Promise((resolve) => setImmediate(resolve));
}

it("has a 5 input and and one button", async () => {
  expect(component.find("form").length).toEqual(1);
  expect(component.find("input").length).toEqual(6);

  expect(component.find("button").length).toEqual(1);
});

it("should change the url after based on the query after clicking", async () => {
  component.find("#Name").simulate("change", { target: { value: "amir" } });
  component
    .find("#Surename")
    .simulate("change", { target: { value: "bavand" } });
  component.find("form").simulate("submit");

  component.update();
  await flushPromises();
  component.update();

  expect(component.state().path).toEqual("?Name=amir&Surename=bavand&");

  // console.log("this is state", component.state());
});
