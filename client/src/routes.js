import React from "react";
import { Route, Switch } from "react-router-dom";
import List from "./compnenets/list/list";
import { withRouter } from "react-router";

import Login from "./compnenets/login/login";

const Routes = ({ location }) => (
  <div>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/list" component={List} />
    </Switch>
  </div>
);

export default withRouter(Routes);
