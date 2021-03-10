import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { isLogin } from "../../src/utils/check-login";

class Main extends Component {
  state = {
    loaded: false,
    isLogedIn: false,
  };

  async componentDidMount() {
    const result = await isLogin();
    this.setState({ isLogedIn: result, loaded: true });
  }

  render() {
    if (this.state.loaded === false) return <div>loading page</div>;
    else if (this.state.isLogedIn === false) return <Redirect to="/login" />;
    else return <Redirect to="/list" />;
  }
}

export default Main;
