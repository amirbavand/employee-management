import ShowTable from "../show-table/show-table";
import { mount, shallow } from "enzyme";
import axios from "axios";
import { BrowserRouter, MemoryRouter } from "react-router-dom";

let component;

afterEach(() => {
  component.unmount();
});

function flushPromises() {
  return new Promise((resolve) => setImmediate(resolve));
}

it("expext to have a table", async () => {
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
      {
        EmployeeId: "joe",
        Name: "amir",
        Surename: "joe",
        PhoneNumber: "123456",
        Address: "kljl",
        Title: "engineer",
        id: "sdc;flkj",
      },
    ],
  });

  component = await mount(
    <MemoryRouter>
      <ShowTable />
    </MemoryRouter>
  );
  component.update();
  await flushPromises();
  component.update();

  expect(component.find("table").length).toEqual(1);
  expect(component.find("Link").length).toEqual(2);
  expect(component.find("tr").length).toEqual(3);
});

it("expect to make correct query parameters after clicking on one link", async () => {
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
  component = await mount(
    <MemoryRouter>
      <ShowTable />
    </MemoryRouter>
  );

  component.update();
  await flushPromises();
  component.update();

  expect(component.find("button").length).toEqual(1);
  console.log("my component", component.find(ShowTable));

  component.find("button").simulate("click");
  component.update();
  await flushPromises();
  component.update();
  //console.log("my component", component.find(ShowTable).instance().state);
  // expect(component.find(ShowTable).instance().state.loaded).toEqual(true);

  expect(component.find(ShowTable).instance().state).toEqual({
    loaded: true,
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
});
