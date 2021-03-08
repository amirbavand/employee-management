import React from "react";
import { Route, Switch } from "react-router-dom";
import Main from "./compnenets/main";
import { withRouter } from "react-router";

import Login from "./compnenets/login/login";

const Routes = ({ location }) => (
  <div>
    <Switch>
      <Route exact path="/" component={Login} />
    </Switch>
  </div>
);

export default withRouter(Routes);
