import { AppBar, Box, Container } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { deepGet } from '../../lib';
import { auth } from '../../lib/actions';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import useStyles from './styles';


const locations = [ '/', '/preferences', '/static-tables' ];
const others = {
  '/initial-setup': 'Setare orar',
};

const Layout = ({ children, user, logout }) => {
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

  const currentTabIndex = useMemo(() => {
    const locationIndex = locations.indexOf(pathname);
    if (locationIndex !== -1)
      return locationIndex;

    if (others[pathname] !== undefined)
      return locations.length;

    return 0;
  }, [ pathname ]);

  return <Box className={ classes.root }>
    <AppBar position="static" className={ classes.appBar }>
      <Typography variant="h5" className={ classes.title }>
        <span className={ classes.sLetter }>S</span>chedulator
      </Typography>
      { initials.length > 0 && <Avatar className={ classes.avatar }>{ initials }</Avatar> }
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
        <Tab label="Preferinte"/>
        <Tab label="Orele altor grupe"/>
        { currentTabIndex === locations.length && <Tab label={ others[pathname] }/> }
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
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);


