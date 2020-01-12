import { AppBar, Avatar, Box, Container, IconButton, Tab, Tabs, Typography } from '@material-ui/core';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import { deepGet } from '../../lib';
import { auth } from '../../lib/actions';
import useStyles from './styles';


const locations = [ '/', '/other-timetables' ];

const Layout = ({ children, user, logout, otherLabel }) => {
  const classes = useStyles();
  const { pathname } = useLocation();
  const history = useHistory();

  const initials = useMemo(() => {
    return `${ deepGet(user, 'firstName.0', '') }${ deepGet(user, 'lastName.0', '') }`;
  }, [ user ]);

  const handleChange = (event, newValue) => {
    if (newValue < locations.length) {
      history.push(locations[newValue]);
    }
  };
  const navigatePreferences = () => {
    history.push('/preferences');
  };


  const currentTabIndex = useMemo(() => {
    const locationIndex = locations.indexOf(pathname);
    if (locationIndex !== -1)
      return locationIndex;

    if (otherLabel !== undefined)
      return locations.length;

    return 0;
  }, [ pathname, otherLabel ]);

  return <Box className={ classes.root }>
    <AppBar position="static" className={ classes.appBar }>
      <Typography variant="h5" className={ classes.title }>
        <span className={ classes.sLetter }>S</span>chedulator
      </Typography>
      { initials.length > 0 && <Avatar className={ classes.avatar }>{ initials }</Avatar> }
      <IconButton color="default" className={ classes.logoutButton } onClick={ navigatePreferences }>
        <SettingsIcon/>
      </IconButton>
      <IconButton color="default" className={ classes.logoutButton } onClick={ logout }>
        <LogoutIcon/>
      </IconButton>
    </AppBar>
    <AppBar position="static" color="default">
      <Tabs value={ currentTabIndex } onChange={ handleChange }
            variant="fullWidth"
            indicatorColor="primary"
            textColor="primary"
      >
        <Tab label="Orele mele"/>
        <Tab label="Alte grupe"/>
        { otherLabel && <Tab label={ otherLabel }/> }
      </Tabs>
    </AppBar>
    <Container maxWidth={ 'lg' } className={ classes.container }>
      { children }
    </Container>
  </Box>;
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(auth.logout()),
  };
};

const mapStateToProps = state => {
  return {
    user: state.auth.currentUser,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);


