import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "providers/AuthProvider";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { token } = useAuth();
  console.log('tokenPrivate',token);
  return (
    <Route
      {...rest}
      render={props =>
        !!token ? <Component {...props} /> : <Redirect to="/signin" />
      }
    />
  );
}
