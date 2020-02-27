import { Box, Button } from '@material-ui/core';
import PrevIcon from '@material-ui/icons/NavigateBefore';
import NextIcon from '@material-ui/icons/NavigateNext';
import React from 'react';
import { useSmallScreenNavigationStyle } from './styles';

const SmallScreenNavigation = ({ onNext, onPrev, nextDisabled, prevDisabled, smallScreen }) => {
  const classes = useSmallScreenNavigationStyle();

  if (!smallScreen)
    return <></>;

  return <Box className={ classes.navigationBox }>
    <Button
      className={ classes.navButton }
      variant="outlined"
      startIcon={ <PrevIcon/> }
      color="secondary"
      onClick={ onPrev }
      disabled={ prevDisabled }>
      Ziua prec.
    </Button>
    <Box className={ classes.flexExpander }/>
    <Button
      className={ classes.navButton }
      variant="outlined"
      startIcon={ <NextIcon/> }
      color="secondary"
      onClick={ onNext }
      disabled={ nextDisabled }>
      Ziua urm.
    </Button>
  </Box>;
};

export default SmallScreenNavigation;
