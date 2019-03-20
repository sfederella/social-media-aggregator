import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import indexRoutes from "routes/index.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/sass/light-bootstrap-dashboard.css?v=1.2.0";
import "./assets/css/custom.css";
import "./assets/css/pe-icon-7-stroke.css";
import 'react-bootstrap-typeahead/css/Typeahead.css';

ReactDOM.render(
  <Router>
    <Switch>
      {indexRoutes.map((item, key) =>
        <Route path={item.path} component={item.component} key={key} />
      )}
    </Switch>
  </Router>,
  document.getElementById("root")
);
