import React, { Component } from "react";
import queryString from "query-string";
import ShowTable from "../show-table/show-table";
import Filter from "../filter/filter";
import { Redirect } from "react-router-dom";

class List extends Component {
  state = {
    redirect: false,
    paramsUrl: "",
  };
  async componentDidMount() {
    console.log(queryString.parse(this.props.location.search));
    console.log(this.props.location.search);
    console.log("hi");
  }

  handleFileterSubmit = (path) => {
    console.log("I am running", path);
    this.setState({ redirect: true, paramsUrl: path });
  };

  render() {
    if (this.state.redirect) {
      console.log(this.state.paramsUrl, "this is params");
      window.location.search = this.state.paramsUrl;
    }

    return (
      <div>
        <Filter handleFileterSubmit={this.handleFileterSubmit} />
        <ShowTable quryParams={this.props.location.search} />
      </div>
    );
  }
}

export default List;
