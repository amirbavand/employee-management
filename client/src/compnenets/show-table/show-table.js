import React, { Component } from "react";
import queryString from "query-string";
import axios from "axios";

class ShowTable extends Component {
  async componentDidMount() {
    const apiPath = "api/employees" + this.props.quryParams;
    try {
      const values = await axios.get(apiPath);
      console.log(values.data);
      console.log("this is data");
    } catch (error) {}
  }
  render() {
    return <div>this is show component page</div>;
  }
}

export default ShowTable;
