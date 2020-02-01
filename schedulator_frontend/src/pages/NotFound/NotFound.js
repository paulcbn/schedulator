import React from 'react';
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';
import Layout from '../../components/Layout/Layout';
import useStyles from './styles';


const NotFound = () => {
  const classes = useStyles();

  return (
    <Layout otherLabel={ 'Not found' }>
      <Box>
        <Typography variant={ 'h3' } color={ 'textSecondary' } className={ classes.typography }>
          Page not found :(
        </Typography>
      </Box>
    </Layout>
  );
};

export default NotFound;
