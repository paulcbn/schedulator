import { AppBar, Avatar, IconButton, Typography } from '@material-ui/core';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
import React from 'react';
import { useLayoutHeaderStyles } from './styles';

const LayoutHeader = ({ isAuthenticated, initials, onNavigateToPreferences, onLogout }) => {
  const classes = useLayoutHeaderStyles();

  return <AppBar position="static" className={ classes.appBar }>
    <Typography variant="h5" className={ classes.title }>
      <span className={ classes.sLetter }>S</span>chedulator
    </Typography>
    { isAuthenticated && <>
      { initials.length > 0 && <Avatar className={ classes.avatar }>{ initials }</Avatar> }
      <IconButton color="default" className={ classes.button } onClick={ onNavigateToPreferences }>
        <SettingsIcon/>
      </IconButton>
      <IconButton color="default" className={ classes.button } onClick={ onLogout }>
        <LogoutIcon/>
      </IconButton>
    </>
    }
  </AppBar>;
};

export default LayoutHeader;
