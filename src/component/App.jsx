import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Signin from "pages/Signin";
import Signup from "pages/Signup";
import Main from "component/Main";
import { AuthProvider } from "providers/AuthProvider";


export default function App() {
  return (
      <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/signup" component={Signup} />
          <Route component={Main}/>
        </Switch>
      </Router>
      </AuthProvider>
  );
}
