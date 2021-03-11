import List from "../../compnenets/list/list";
import ShowTable from "../show-table/show-table";
import { mount, shallow } from "enzyme";

let component;

beforeEach(async () => {
  const location = { search: "" };

  // checkLogin.isLogin = await jest.fn().mockResolvedValueOnce(true);

  component = shallow(<List location={location} />);
});

it("expext to have a fileter and a ShowTable", async () => {
  expect(component.find("Filter").length).toEqual(1);
  expect(component.find("ShowTable").length).toEqual(1);
});
