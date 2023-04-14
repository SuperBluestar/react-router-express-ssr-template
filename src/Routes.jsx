import React from "react"
import { Route, Switch } from "react-router-dom";

import Homepage from "./pages/Homepage";
import Aboutpage from './pages/About';

function Routes() {
  return (
    <Switch>
      <Route exact path='/'>
        <Homepage />
      </Route>
      <Route exact path='/about'>
        <Aboutpage />
      </Route>
    </Switch>
  );
}

export default Routes;
