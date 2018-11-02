import AppBar from "../../components/AppBar";
import Home from "../home";
import IpoList from "../ipoList";
import IssuerDetails from "../issuerDetails";
import IssuerProfile from "../IssuerProfile";
import IssuerSignUp from "../issuerSignUp";
import Login from "../login";
import React from "react";
import Register from "../register";
import portfolioInvestor from "../portfolioInvestor";
import {Route, Switch} from "react-router-dom";

export default () => (
  <Switch>
    <Route
      exact
      path="/login"
      component={Login} />
    <Route
      exact
      path="/register"
      component={Register} />
    <AppBar title="PIPO">
      <Route
        exact
        path="/"
        component={Home} />
      <Route
        exact
        path="/issuer_details/:id"
        component={IssuerDetails} />
      <Route
        exact
        path="/issuer_signup"
        component={IssuerSignUp} />
      <Route
        exact
        path="/ipoList"
        component={IpoList} />
      <Route
        exact
        path="/investor_portfolio"
        component={portfolioInvestor} />
        path="/issuer_profile"
        component={IssuerProfile} />
    </AppBar>
  </Switch>
);
