import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import "./employee.css";

class Employee extends Component {
  state = {
    EmployeeId: "",
    Name: "",
    Surename: "",
    PhoneNumber: "",
    Address: "",
    Title: "",
    buttonText: "Edit",
    editMode: false,
    redirect: false,
  };

  async componentDidMount() {
    const axiosInstance = axios.create({
      baseURL: "https://employees.dev/",
    });

    const apiPath = "api/employees?_id=" + this.props.match.params.employee_id;

    console.log(apiPath);
    try {
      let { data } = await axiosInstance.get(apiPath);
      data = data[0];
      this.setState({
        EmployeeId: data.EmployeeId,
        Name: data.Name,
        Surename: data.Surename,
        PhoneNumber: data.PhoneNumber,
        Address: data.Address,
        Title: data.Title,
      });
    } catch (error) {}
  }

  checkForError = () => {
    let isError = false;
    if (this.state.EmployeeId === "") {
      this.setState({ EmployeeIdError: "pelase enter Employee Id" });
      isError = true;
    }
    if (this.state.Name === "") {
      this.setState({ NameError: "pelase enter Name" });
      isError = true;
    }
    if (this.state.Surename === "") {
      this.setState({ SurenameError: "pelase enter Surename" });
      isError = true;
    }
    if (this.state.PhoneNumber === "") {
      this.setState({ PhoneNumberError: "pelase enter Phone Number" });
      isError = true;
    }
    if (this.state.Address === "") {
      this.setState({ AddressError: "pelase enter Address" });
      isError = true;
    }
    if (this.state.Title === "") {
      this.setState({ TitleError: "pelase enter Title" });
      isError = true;
    }
    return isError;
  };

  deleteHandle = async (event) => {
    const axiosInstance = axios.create({
      baseURL: "https://employees.dev/",
    });
    const apiPath = "api/employees/" + this.props.match.params.employee_id;
    try {
      const values = await axiosInstance.delete(apiPath);
      this.setState({ redirect: true });
    } catch (error) {
      this.setState({ generalError: "could not delete, something wnet wrong" });
    }
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    if (this.state.editMode === false) {
      this.setState({ editMode: true, buttonText: "submit" });
      return;
    }
    const axiosInstance = axios.create({
      baseURL: "https://employees.dev/",
    });
    this.setState({
      EmployeeIdError: "",
      NameError: "",
      SurenameError: "",
      PhoneNumberError: "",
      AddressError: "",
      TitleError: "",
    });
    const isError = this.checkForError();
    if (isError) return;
    try {
      const apiPath = "api/employees/" + this.props.match.params.employee_id;

      console.log(this.state.Surename, "this is surename");
      const values = await axiosInstance.put(apiPath, {
        EmployeeId: this.state.EmployeeId,
        Name: this.state.Name,
        Surename: this.state.Surename,
        PhoneNumber: this.state.PhoneNumber,
        Address: this.state.Address,
        Title: this.state.Title,
      });
      this.setState({ redirect: true });
    } catch (error) {
      this.setState({ generalError: "employee already exists" });
    }
  };

  handleChangeEmployeeId = (event) => {
    if (this.state.editMode) this.setState({ EmployeeId: event.target.value });
  };

  handleChangeName = (event) => {
    if (this.state.editMode) this.setState({ Name: event.target.value });
  };

  handleChangeSurename = (event) => {
    if (this.state.editMode) this.setState({ Surename: event.target.value });
  };

  handleChangePhoneNumber = (event) => {
    if (this.state.editMode) this.setState({ PhoneNumber: event.target.value });
  };

  handleChangeAddress = (event) => {
    if (this.state.editMode) this.setState({ Address: event.target.value });
  };

  handleChangeTitle = (event) => {
    if (this.state.editMode) this.setState({ Title: event.target.value });
  };

  render() {
    if (this.state.redirect === true) return <Redirect to="/list" />;

    return (
      <div className="form">
        <div>
          <h2>Add Employee</h2>
        </div>

        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Employee Id</label>
            <input
              className="input_text"
              type="text"
              name="EmployeeId"
              placeholder="EmployeeId"
              id="EmployeeId"
              value={this.state.EmployeeId}
              onChange={this.handleChangeEmployeeId}
            />
            <span
              className="warning"
              id="warning-EmployeeId"
              style={{ color: "red" }}
            >
              {this.state.EmployeeIdError}
            </span>
          </div>
          <div>
            <label>Name </label>

            <input
              className="input_text"
              type="text"
              name="Name"
              placeholder="Name"
              id="Name"
              value={this.state.Name}
              onChange={this.handleChangeName}
            />
            <span
              className="warning"
              id="warning-Name"
              style={{ color: "red" }}
            >
              {this.state.NameError}
            </span>
          </div>
          <div>
            <label>Surename</label>

            <input
              className="input_text"
              type="text"
              name="Surename"
              placeholder="Surename"
              id="Surename"
              value={this.state.Surename}
              onChange={this.handleChangeSurename}
            />
            <span
              className="warning"
              id="warning-Surename"
              style={{ color: "red" }}
            >
              {this.state.SurenameError}
            </span>
          </div>
          <div>
            <label>Phone Number</label>

            <input
              className="input_text"
              type="text"
              name="PhoneNumber"
              placeholder="PhoneNumber"
              id="PhoneNumber"
              value={this.state.PhoneNumber}
              onChange={this.handleChangePhoneNumber}
            />
            <span
              className="warning"
              id="warning-PhoneNumber"
              style={{ color: "red" }}
            >
              {this.state.PhoneNumberError}
            </span>
          </div>
          <div>
            <label>Address</label>

            <input
              className="input_text"
              type="text"
              name="Address"
              placeholder="Address"
              id="Address"
              value={this.state.Address}
              onChange={this.handleChangeAddress}
            />
            <span
              className="warning"
              id="warning-Address"
              style={{ color: "red" }}
            >
              {this.state.AddressError}
            </span>
          </div>
          <div>
            <label>Title</label>

            <input
              className="input_text"
              type="text"
              name="Title"
              placeholder="Title"
              id="Title"
              value={this.state.Title}
              onChange={this.handleChangeTitle}
            />
            <span
              className="warning"
              id="warning-Title"
              style={{ color: "red" }}
            >
              {this.state.TitleError}
            </span>
            <span
              className="warning"
              id="warning-general"
              style={{ color: "red" }}
            >
              {this.state.generalError}
            </span>
          </div>
          <div>
            <button type="submit" className="submitButton">
              {this.state.buttonText}
            </button>
          </div>
        </form>
        <div>
          <button onClick={this.deleteHandle}>delete</button>
        </div>
      </div>
    );
  }
}

export default Employee;
