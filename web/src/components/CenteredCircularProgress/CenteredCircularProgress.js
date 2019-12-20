import React from 'react';
import { CircularProgress } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import useStyles from './styles';

const CenteredCircularProgress = () => {
  const classes = useStyles();
  return <Box className={ classes.root }>
    <CircularProgress/>
  </Box>;
};
export default CenteredCircularProgress;
