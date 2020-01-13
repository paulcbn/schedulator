import { AppBar, Tab, Tabs } from '@material-ui/core';
import React from 'react';

const LayoutNavigation = ({ locations, currentTabIndex, otherLabel, handleChangeTabIndex }) => {
  // const classes = useLayoutNavigationStyles();
  return <AppBar position="static" color="default">
    <Tabs value={ currentTabIndex } onChange={ handleChangeTabIndex }
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
    >
      { locations.map(({ tabLabel }) => <Tab key={ tabLabel } label={ tabLabel }/>) }
      { otherLabel && <Tab label={ otherLabel }/> }
    </Tabs>
  </AppBar>;
};

export default LayoutNavigation;
