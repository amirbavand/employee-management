import React, { Component } from "react";
import "./filter.css";
import { Link, Redirect } from "react-router-dom";

class Filter extends Component {
  state = {
    EmployeeId: "",
    Name: "",
    Surename: "",
    PhoneNumber: "",
    Address: "",
    Title: "",
    path: "?",
    redirect: false,
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    if (this.state.EmployeeId !== "")
      await this.setState({
        path: this.state.path + "EmployeeId=" + this.state.EmployeeId + "&",
      });
    if (this.state.Name !== "")
      await this.setState({
        path: this.state.path + "Name=" + this.state.Name + "&",
      });
    if (this.state.Surename !== "")
      await this.setState({
        path: this.state.path + "Surename=" + this.state.Surename + "&",
      });
    if (this.state.PhoneNumber !== "")
      await this.setState({
        path: this.state.path + "PhoneNumber=" + this.state.PhoneNumber + "&",
      });
    if (this.state.Address !== "")
      await this.setState({
        path: this.state.path + "Address=" + this.state.Address + "&",
      });
    if (this.state.Title !== "")
      await this.setState({
        path: this.state.path + "Title=" + this.state.Title + "&",
      });
    this.props.handleFileterSubmit(this.state.path);
    //  this.setState({ redirect: true });
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
    return (
      <div className="form_filter">
        <div>
          <h2>Filter data</h2>
        </div>

        <form onSubmit={this.handleSubmit}>
          <div>
            <div className="input_form">
              <input
                className="input_text_filter"
                type="text"
                name="EmployeeId"
                placeholder="EmployeeId"
                id="EmployeeId"
                value={this.state.EmployeeId}
                onChange={this.handleChangeEmployeeId}
              />
            </div>
            <div className="input_form">
              <input
                className="input_text_filter"
                type="text"
                name="Name"
                placeholder="Name"
                id="Name"
                value={this.state.Name}
                onChange={this.handleChangeName}
              />
            </div>
            <div className="input_form">
              <input
                className="input_text_filter"
                type="text"
                name="Surename"
                placeholder="Surename"
                id="Surename"
                value={this.state.Surename}
                onChange={this.handleChangeSurename}
              />
            </div>
            <div className="input_form">
              <input
                className="input_text_filter"
                type="text"
                name="PhoneNumber"
                placeholder="PhoneNumber"
                id="PhoneNumber"
                value={this.state.PhoneNumber}
                onChange={this.handleChangePhoneNumber}
              />
            </div>
            <div className="input_form">
              <input
                className="input_text_filter"
                type="text"
                name="Address"
                placeholder="Address"
                id="Address"
                value={this.state.Address}
                onChange={this.handleChangeAddress}
              />
            </div>
            <div className="input_form">
              <input
                className="input_text_filter"
                type="text"
                name="Title"
                placeholder="Title"
                id="Title"
                value={this.state.Title}
                onChange={this.handleChangeTitle}
              />
            </div>
          </div>

          <div className="clear">
            <button type="submit" className="submitButton_filter">
              Filter
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

export default Filter;
