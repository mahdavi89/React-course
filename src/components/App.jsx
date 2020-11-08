import React from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Signin from "pages/Signin";
import Signup from "pages/Signup";
import Main from "./Main";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "services/AuthProvider";
import PrivateRoute from './PrivateRoute'
import useAuthContext from "services/useAuthContext";

export default function App() {
 // const {user}=useAuthContext()
  return (
    <React.Fragment>
      <CssBaseline />
      <AuthProvider>
         <Router>
        <Switch>
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/signup" component={Signup} />
          <PrivateRoute component={Main} />
        </Switch>
      </Router>
      </AuthProvider>
     
      <ToastContainer />
    </React.Fragment>
  );
}
