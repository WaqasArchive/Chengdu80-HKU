import About from "../about";
import Home from "../home";
import React from "react";
import {Link, Route} from "react-router-dom";

export default () => (
  <div>
    <header>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
    </header>

    <main>
      <Route
        exact
        path="/"
        component={Home}
      />
      <Route
        exact
        path="/about"
        component={About}
      />
    </main>
  </div>
);
