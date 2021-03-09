import React, { Component } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import "./login.css";
class Login extends Component {
  state = {
    username: "",
    password: "",
    redirectToHome: false,
    userError: "",
    passError: "",
    generalError: "",
  };

  handleChangeUsername = (event) => {
    this.setState({ username: event.target.value });
  };

  handleChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const username = this.state.username;
    console.log("this is username", username);
    const password = this.state.password;
    let usernameError = "";
    let passwordError = "";
    this.state.generalError = "";
    if (username === "") {
      usernameError = "Username is empty";
    }
    if (password === "") {
      passwordError = "Password is empty";
    }
    this.setState({ userError: usernameError, passError: passwordError });

    if (username === "" || password === "") {
      return;
    }

    try {
      const values = await axios.post(
        "api/login",
        {},
        {
          auth: {
            username: username,
            password: password,
          },
        }
      );
      this.setState({ redirectToHome: true });
      return <Redirect to="/home" />;
    } catch (error) {
      console.log("i am in the catch");
      this.setState({ generalError: "username or password is incorect" });
    }
  };

  render() {
    if (this.state.redirectToHome) {
      return <Redirect to="/home" />;
    }
    return (
      <div className="form">
        <div>
          <h1>login</h1>
        </div>

        <form onSubmit={this.handleSubmit}>
          <div>
            <input
              className="input_text"
              type="text"
              name="username"
              placeholder="username"
              id="username"
              value={this.state.username}
              onChange={this.handleChangeUsername}
            />
            <span
              className="warning"
              id="warning-username"
              style={{ color: "red" }}
            >
              {this.state.userError}
            </span>
          </div>
          <div>
            <input
              className="input_text"
              type="password"
              name="password"
              placeholder="password"
              id="password"
              value={this.state.password}
              onChange={this.handleChangePassword}
            />
            <span
              className="warning"
              id="warning-password"
              style={{ color: "red" }}
            >
              {this.state.passError}
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

export default Login;
