import React, { Component } from "react";
import queryString from "query-string";
import axios from "axios";
import "./show-table.css";
import { Link } from "react-router-dom";

class ShowTable extends Component {
  state = {
    loaded: false,
    data: [],
  };
  async componentDidMount() {
    const apiPath = "api/employees" + this.props.quryParams;
    try {
      const { data } = await axios.get(apiPath);
      this.setState({ data: data, loaded: true });
      console.log(this.state.data);
    } catch (error) {
      console.log("something went wrong");
    }
  }

  render() {
    if (this.state.loaded === false) return <h2>table is loading</h2>;

    console.log(this.employeeList);
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>EmployeeId</th>
              <th>Name</th>
              <th>Surename</th>
              <th>PhoneNumber</th>
              <th>Address</th>
              <th>Title</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.EmployeeId}</td>
                <td>{employee.Name}</td>
                <td>{employee.Surename}</td>
                <th>{employee.PhoneNumber}</th>
                <td>{employee.Address}</td>
                <td>{employee.Title}</td>
                <td>
                  <Link to={"/employees/" + employee.id}>
                    <button>detail</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ShowTable;
