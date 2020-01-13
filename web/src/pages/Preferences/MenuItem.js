import { Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { OverlayCircularProgress } from '../../components/OverlayCircularProgress';
import { useMenuItemStyles } from './styles';

const MenuItem = ({ onClick, description, title, actionText, loading }) => {
  const classes = useMenuItemStyles();
  return <Paper className={ classes.paper }>
    <OverlayCircularProgress show={ loading }/>
    <Typography variant={ 'h5' } className={ classes.header }>{ title }</Typography>
    <Divider/>
    <Typography variant={ 'body1' } className={ classes.content }>
      { description }
    </Typography>
    <Box className={ classes.buttonBox }>
      <Button
        onClick={ onClick } color="secondary"
        variant="outlined" className={ classes.button }>
        { actionText }
      </Button>
    </Box>
  </Paper>;
};

export default MenuItem;
