import React, { Component } from "react";
import queryString from "query-string";
import ShowTable from "../show-table/show-table";
import Filter from "../filter/filter";

class List extends Component {
  async componentDidMount() {
    //   console.log(queryString.parse(this.props.location.search));
    console.log(this.props.location.search);
    console.log("hi");
  }
  render() {
    return (
      <div>
        <Filter />
        <ShowTable quryParams={this.props.location.search} />
      </div>
    );
  }
}

export default List;
