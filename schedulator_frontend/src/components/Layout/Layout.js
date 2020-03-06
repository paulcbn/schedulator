import { Box, Container } from '@material-ui/core';

import React, { useCallback, useMemo } from 'react';
import { connect } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import { deepGet } from '../../lib/utils';
import { auth } from '../../lib/actions';
import { offlineLayoutConfig, onlineLayoutConfig } from './config';
import LayoutHeader from './LayoutHeader';
import LayoutNavigation from './LayoutNavigation';
import useStyles from './styles';


const Layout = ({ children, user, logout, otherLabel, isAuthenticated }) => {
  const classes = useStyles();
  const { pathname } = useLocation();
  const history = useHistory();

  const layoutConfig = useMemo(() => isAuthenticated ? onlineLayoutConfig : offlineLayoutConfig, [ isAuthenticated ]);
  const initials = useMemo(() => `${ deepGet(user, 'firstName.0', '') }${ deepGet(user, 'lastName.0', '') }`, [ user ]);
  const currentTabIndex = useMemo(() => {
    const locationIndex = layoutConfig.locations.findIndex((location) => location.route === pathname);
    if (locationIndex !== -1)
      return locationIndex;

    if (otherLabel !== undefined)
      return layoutConfig.locations.length;

    return 0;
  }, [ pathname, otherLabel, layoutConfig.locations ]);

  const handleChangeTabIndex = useCallback((event, newValue) => {
    if (newValue < layoutConfig.locations.length) {
      history.push(layoutConfig.locations[newValue].route);
    }
  }, [ history, layoutConfig.locations ]);
  const navigatePreferences = useCallback(() => history.push(layoutConfig.preferencesRoute), [ layoutConfig, history ]);

  return <Box className={ classes.root }>
    <LayoutHeader
      isAuthenticated={ isAuthenticated }
      initials={ initials }
      onLogout={ logout }
      onNavigateToPreferences={ navigatePreferences }
    />
    <LayoutNavigation
      locations={ layoutConfig.locations }
      currentTabIndex={ currentTabIndex }
      handleChangeTabIndex={ handleChangeTabIndex }
      otherLabel={ otherLabel }
    />
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
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.currentUser,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);


