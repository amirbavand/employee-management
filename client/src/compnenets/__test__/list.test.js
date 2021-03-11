import List from "../../compnenets/list/list";
import ShowTable from "../show-table/show-table";
import { mount } from "enzyme";

let component;

beforeEach(async () => {
  const location = { search: "" };

  // checkLogin.isLogin = await jest.fn().mockResolvedValueOnce(true);

  component = mount(<List location={location} />);
});

//afterEach(() => {
//  component.unmount();
//});

it("has show-table and a filter", async () => {
  expect(component.find("Filter").length).toEqual(1);
  expect(component.find("ShowTable").length).toEqual(1);
});
