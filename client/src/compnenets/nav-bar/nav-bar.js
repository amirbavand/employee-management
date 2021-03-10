import React, { Component } from "react";
import "./nav-bar.css";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";

class Navbar extends Component {
  state = {
    clicked: false,
    signouted: false,
  };
  constructor(props) {
    super(props);

    this.handleSignout = this.handleSignout.bind(this);
  }

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  };

  async handleSignout() {
    try {
      console.log("thus is signout");

      const values = await axios.post("/api/users/signout", {});
      this.setState({ signouted: true });

      return true;
    } catch (error) {
      console.log("could not sign out");
      return false;
    }
  }

  render() {
    if (this.state.signouted) {
      return <Redirect to="/login" />;
    }
    return (
      <nav className="NavbarItems">
        <div className="menu-icon" onClick={this.handleClick}>
          <i
            className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}
          ></i>
        </div>
        <ul className={this.state.clicked ? "nav-menu active" : "nav-menu"}>
          <li key="1">
            <Link className="nav-links" to="/list">
              List
            </Link>
          </li>
          <li key="2">
            <Link className="nav-links" to="/add">
              Add
            </Link>
          </li>

          <li key="3">
            <button className="nav-links-mobile" onClick={this.handleSignout}>
              Sign out
            </button>
          </li>
        </ul>
        <button
          className={`btn  btn--medium btn--primary signout-button`}
          onClick={this.handleSignout}
        >
          Sign out
        </button>
      </nav>
    );
  }
}

export default Navbar;
