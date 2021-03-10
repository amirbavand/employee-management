import React from "react";
import { Route, Switch } from "react-router-dom";
import Add from "./compnenets/add/add";
import List from "./compnenets/list/list";

import { withRouter } from "react-router";
import Main from "./compnenets/main";
import Navbar from "./compnenets/nav-bar/nav-bar";
import Login from "./compnenets/login/login";

const authPathes = ["/login"];

const Routes = ({ location }) => (
  <div>
    {!authPathes.includes(location.pathname) && <Navbar />}

    <Switch>
      <Route exact path="/" component={Main} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/list" component={List} />
      <Route exact path="/Add" component={Add} />
    </Switch>
  </div>
);

export default withRouter(Routes);
