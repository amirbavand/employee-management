import React, { Component } from "react";
import queryString from "query-string";
import ShowTable from "../show-table/show-table";
import Filter from "../filter/filter";

class List extends Component {
  async componentDidMount() {
    console.log(queryString.parse(this.props.location.search));
  }
  render() {
    return (
      <div>
        <Filter />
        <ShowTable />
      </div>
    );
  }
}

export default List;
