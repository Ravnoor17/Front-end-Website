import React from "react";
import { Redirect, Route } from "react-router-dom";
import isAuth from "./AdminAuth";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth() && isAuth() ? (
          <div>
            <Component {...props} />
          </div>
        ) : (
          <div>
            <Redirect to="/admin/login" />
          </div>
        )
      }
    />
  );
};

export default PrivateRoute;
