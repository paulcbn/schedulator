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
  OtherTimetables,
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
          <Route exact path="/other-timetables">
            <OtherTimetables authState={ this.props.auth }/>
          </Route>
          <Route exact path="/sections/:sectionId">
            <OtherSection authState={ this.props.auth }/>
          </Route>
          <Route exact path="/static-tables/:searchId">
            <StaticTable authState={ this.props.auth }/>
          </Route>
          <Route exact path="/login">
            <Login/>
          </Route>
          <Route exact path="/register">
            <Register/>
          </Route>
          <Route>
            <NotFound/>
          </Route>
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
