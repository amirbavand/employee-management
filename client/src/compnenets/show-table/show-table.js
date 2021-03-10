import React, { Component } from "react";
import queryString from "query-string";
import axios from "axios";
import "./show-table.css";

class ShowTable extends Component {
  state = {
    loaded: false,
  };
  async componentDidMount() {
    const apiPath = "api/employees" + this.props.quryParams;
    try {
      const values = await axios.get(apiPath);
      console.log(values.data[1].EmployeeId);
      console.log("this is data");
    } catch (error) {}
  }
  render() {
    if (this.state.loaded === false) return <h2>table is loading</h2>;
    return (
      <div>
        <table>
          <tr>
            <th>EmployeeId</th>
            <th>Name</th>
            <th>Surename</th>
            <th>PhoneNumber</th>
            <th>Address</th>
            <th>Title</th>
            <th>
              <button>Deail</button>
            </th>
          </tr>
          <tr>
            <td>Alfreds Futterkiste</td>
            <td>Maria Anders</td>
            <td>Germany</td>
            <td>Alfreds Futterkiste</td>
            <td>Maria Anders</td>
            <td>Alfreds Futterkiste</td>
            <th>
              <button>Deail</button>
            </th>
          </tr>
          <tr>
            <td>Centro comercial Moctezuma</td>
            <td>Francisco Chang</td>
            <td>Mexico</td>
            <td>Alfreds Futterkiste</td>
            <td>Maria Anders</td>
            <td>Centro comercial Moctezuma</td>
            <th>
              <button>Deail</button>
            </th>
          </tr>
          <tr>
            <td>Ernst Handel</td>
            <td>Roland Mendel</td>
            <td>Austria</td>
            <td>Alfreds Futterkiste</td>
            <td>Maria Anders</td>
            <td>Centro comercial Moctezuma</td>
            <th>
              <button>Deail</button>
            </th>
          </tr>
          <tr>
            <td>Island Trading</td>
            <td>Helen Bennett</td>
            <td>UK</td>
            <td>Alfreds Futterkiste</td>
            <td>Maria Anders</td>
            <td>Centro comercial Moctezuma</td>
            <th>
              <button>Deail</button>
            </th>
          </tr>
          <tr>
            <td>Laughing Bacchus Winecellars</td>
            <td>Yoshi Tannamuri</td>
            <td>Canada</td>
            <td>Alfreds Futterkiste</td>
            <td>Maria Anders</td>
            <td>Centro comercial Moctezuma</td>
            <th>
              <button>Deail</button>
            </th>
          </tr>
          <tr>
            <td>Magazzini Alimentari Riuniti</td>
            <td>Giovanni Rovelli</td>
            <td>Italy</td>
            <td>Alfreds Futterkiste</td>
            <td>Maria Anders</td>
            <td>Centro comercial Moctezuma</td>
            <th>
              <button>Deail</button>
            </th>
          </tr>
        </table>
      </div>
    );
  }
}

export default ShowTable;
