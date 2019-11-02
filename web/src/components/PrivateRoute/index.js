import React from "react";
import {Redirect, Route} from "react-router-dom";


const PrivateRoute = ({component: ChildComponent, authState, ...rest}) => {
  return <Route {...rest} render={props => {
    if (authState.isLoading) {
      return <em>Loading...</em>;
    } else if (!authState.isAuthenticated) {
      return <Redirect to="/login"/>;
    } else {
      return <ChildComponent {...props} />
    }
  }}/>
};

export default PrivateRoute;