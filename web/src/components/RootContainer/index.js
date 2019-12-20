import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { auth } from '../../lib/actions';
import {
  Dashboard,
  InitialSetup,
  Login,
  NotFound,
  OtherSection,
  OtherSections,
  Preferences,
  Register,
  StaticTable,
  Attendances,
} from '../../pages';
import PrivateRoute from '../PrivateRoute';

class RootContainerComponent extends Component {

  componentDidMount() {
    this.props.loadUser();
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path="/" component={ Dashboard } authState={ this.props.auth }/>
          <PrivateRoute exact path="/preferences/initial-setup" component={ InitialSetup }
                        authState={ this.props.auth }/>
          <PrivateRoute exact path="/preferences/attendances" component={ Attendances } authState={ this.props.auth }/>
          <PrivateRoute exact path="/preferences" component={ Preferences } authState={ this.props.auth }/>
          <PrivateRoute exact path="/other-sections" component={ OtherSections } authState={ this.props.auth }/>
          <PrivateRoute exact path="/other-sections/:sectionId" component={ OtherSection }
                        authState={ this.props.auth }/>
          <PrivateRoute exact path="/static-tables/:searchId" component={ StaticTable }
                        authState={ this.props.auth }/>
          <Route exact path="/login" component={ Login }/>
          <Route exact path="/register" component={ Register }/>
          <Route component={ NotFound }/>
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadUser: () => {
      return dispatch(auth.loadUser());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RootContainerComponent);
