import About from "../about";
import AppBar from "../../components/AppBar";
import Home from "../home";
import React from "react";
import {Route} from "react-router-dom";

export default () => (
  <div>
    <AppBar title="PIPO - HKU">
      <Route
        exact
        path="/"
        component={Home}/>
      <Route
        exact
        path="/about"
        component={About}/>
    </AppBar>
  </div>
);
