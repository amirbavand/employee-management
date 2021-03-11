import Employee from "../employee/employee";
import { mount } from "enzyme";
import axios from "axios";
import { MemoryRouter, StaticRouter } from "react-router-dom";
let component;

function flushPromises() {
  return new Promise((resolve) => setImmediate(resolve));
}

beforeEach(async () => {
  const match = { params: { employee_id: "fklj;flkj" } };

  await axios.get.mockResolvedValueOnce({
    data: [
      {
        EmployeeId: "joe",
        Name: "amir",
        Surename: "joe",
        PhoneNumber: "123456",
        Address: "kljl",
        Title: "engineer",
        id: "fklj;flkj",
      },
    ],
  });

  component = mount(<Employee match={match} />);
  component.update();
  await flushPromises();
  component.update();
});

afterEach(() => {
  component.unmount();
});

it("has two button and six inputs", () => {
  expect(component.find("form").length).toEqual(1);
  expect(component.find("button").length).toEqual(2);
  expect(component.find("input").length).toEqual(6);
});

it("should not change value of fileds in the view mode", () => {
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
  expect(component.state().EmployeeId).toEqual("joe");
  expect(component.state().Name).toEqual("amir");
  expect(component.state().Surename).toEqual("joe");
  expect(component.state().PhoneNumber).toEqual("123456");
  expect(component.state().Address).toEqual("kljl");
  expect(component.state().Title).toEqual("engineer");
});

it("go to edit mode after clicking on edit button", async () => {
  expect(component.state().editMode).toEqual(false);
  component.find("form").simulate("submit");
  component.update();

  await flushPromises();

  component.update();
  expect(component.state().buttonText).toEqual("submit");
  expect(component.state().editMode).toEqual(true);
});

it("should  change value of fileds in the edit mode", async () => {
  component.find("form").simulate("submit");
  component.update();

  await flushPromises();

  component.update();
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
  expect(component.state().EmployeeId).toEqual("amir");
  expect(component.state().Name).toEqual("amir");
  expect(component.state().Surename).toEqual("amir");
  expect(component.state().PhoneNumber).toEqual("amir");
  expect(component.state().Address).toEqual("amir");
  expect(component.state().Title).toEqual("amir");
});

it("should  reaise error by having empty filed", async () => {
  component.find("form").simulate("submit");
  component.update();

  await flushPromises();

  component.update();
  component.find("#EmployeeId").simulate("change", { target: { value: "" } });
  component.find("#Name").simulate("change", { target: { value: "" } });
  component.find("#Surename").simulate("change", { target: { value: "" } });
  component.find("#PhoneNumber").simulate("change", { target: { value: "" } });
  component.find("#Address").simulate("change", { target: { value: "" } });
  component.find("#Title").simulate("change", { target: { value: "" } });
  component.find("form").simulate("submit");
  component.update();

  await flushPromises();

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

it("should submit values when everything is ok", async () => {
  component.find("form").simulate("submit");
  component.update();
  await axios.put.mockResolvedValueOnce({ data: [] });

  await flushPromises();

  component.update();
  component
    .find("#EmployeeId")
    .simulate("change", { target: { value: "amir1" } });
  component.find("#Name").simulate("change", { target: { value: "amir" } });
  component.find("#Surename").simulate("change", { target: { value: "amir" } });
  component
    .find("#PhoneNumber")
    .simulate("change", { target: { value: "amir" } });
  component.find("#Address").simulate("change", { target: { value: "amir" } });
  component.find("#Title").simulate("change", { target: { value: "amir" } });
  console.log(component.state(), "this statecomp");

  component.find("form").simulate("submit");
  //component.update();

  await flushPromises();

  // component.update();
  //console.log(component.state(), "this statecomp");
});
