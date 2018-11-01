import About from "../about";
import AppBar from "../../components/AppBar";
import Counter from "../counter";
import Home from "../home";
import IssuerDetails from "../issuerDetails";
import IssuerSignUp from "../issuerSignUp";
import Login from "../login";
import React from "react";
import {Route, Switch} from "react-router-dom";

export default () => (
  <Switch>
    <Route
      exact
      path="/login"
      component={Login} />
    <AppBar title="PIPO">
      <Route
        exact
        path="/"
        component={Home} />
      <Route
        exact
        path="/about"
        component={About} />
      <Route
        exact
        path="/counter"
        component={Counter} />
      <Route
        exact
        path="/issuer_details"
        component={IssuerDetails} />
      <Route
        exact
        path="/issuer_signup"
        component={IssuerSignUp} />
    </AppBar>
  </Switch>
);
