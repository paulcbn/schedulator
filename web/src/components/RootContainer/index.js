import React, {Component} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {auth} from '../../lib/actions'
import {connect} from "react-redux";
import PrivateRoute from "../PrivateRoute";
import {Dashboard, Register, NotFound, Login} from "../../pages";

class RootContainerComponent extends Component {

  componentDidMount() {
    this.props.loadUser();
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path="/" component={Dashboard} authState={this.props.auth}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/register" component={Register}/>
          <Route component={NotFound}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    loadUser: () => {
      return dispatch(auth.loadUser());
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(RootContainerComponent);
