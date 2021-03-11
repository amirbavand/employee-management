import React, { Component } from "react";
import checkLogin from "../../../src/utils/check-login";
import { Redirect } from "react-router-dom";
import axios from "axios";

class Add extends Component {
  state = {
    loaded: false,
    isLogedIn: false,
    EmployeeId: "",
    Name: "",
    Surename: "",
    PhoneNumber: "",
    Address: "",
    Title: "",
    EmployeeIdError: "",
    NameError: "",
    SurenameError: "",
    PhoneNumberError: "",
    AddressError: "",
    TitleError: "",
    generalError: "",
    redirect: false,
  };

  async componentDidMount() {
    const result = await checkLogin.isLogin();
    console.log("this is result", result);
    this.setState({ isLogedIn: result, loaded: true });
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

  handleSubmit = async (event) => {
    event.preventDefault();
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
      console.log(this.state.Surename, "this is surename");
      const values = await axios.post("api/employees", {
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
    this.setState({ EmployeeId: event.target.value });
  };

  handleChangeName = (event) => {
    this.setState({ Name: event.target.value });
  };

  handleChangeSurename = (event) => {
    this.setState({ Surename: event.target.value });
  };

  handleChangePhoneNumber = (event) => {
    this.setState({ PhoneNumber: event.target.value });
  };

  handleChangeAddress = (event) => {
    this.setState({ Address: event.target.value });
  };

  handleChangeTitle = (event) => {
    this.setState({ Title: event.target.value });
  };

  render() {
    if (this.state.redirect === true) return <Redirect to="/list" />;
    //  if (this.state.loaded === false) return <div>loading page</div>;
    //  else if (this.state.isLogedIn === false) return <Redirect to="/login" />;

    return (
      <div className="form">
        <div>
          <h2>Add Employee</h2>
        </div>

        <form onSubmit={this.handleSubmit}>
          <div>
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
              submit
            </button>
          </div>
        </form>
        <div>
          <h1>{this.state.index}</h1>
        </div>
      </div>
    );
  }
}

export default Add;
