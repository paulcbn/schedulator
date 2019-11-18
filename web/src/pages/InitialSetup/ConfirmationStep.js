import { Box, Button, Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import PrevIcon from '@material-ui/icons/NavigateBefore';
import NextIcon from '@material-ui/icons/NavigateNext';
import PeopleIcon from '@material-ui/icons/People';
import BookIcon from '@material-ui/icons/MenuBook';
import React from 'react';
import { connect } from 'react-redux';
import { useConfirmationChoiceStyles } from './styles';


const ConfirmationStep = ({ state: { selectedSection, selectedFormations, selectedSubjects }, onConfirm, onBack }) => {
  const classes = useConfirmationChoiceStyles();
  return <>
    <Box className={ classes.box }>
      <Grid container spacing={ 3 }>
        <Grid item xs={ 12 }>
          <Typography variant='h5'>
            Confirma alegerile
          </Typography>
          <Divider/>
        </Grid>
        <Grid item xs={ 12 }>
          <Box className={ classes.subtitleBox }>
            <Typography variant='h6'>
              Sectia:&nbsp;
            </Typography>
            <Typography variant='h6' color="textSecondary">
              { selectedSection.name }
            </Typography>
          </Box>
        </Grid>
        <Grid item md={ 6 }>
          <Typography variant='h6'>Formatiile:</Typography>
          <List>
            { selectedFormations.map(formation =>
              <ListItem key={ formation.name }>
                <ListItemAvatar>
                  <PeopleIcon/>
                </ListItemAvatar>
                <ListItemText primary={ formation.name }/>
              </ListItem>) }
          </List>
        </Grid>
        <Grid item md={ 6 }>
          <Typography variant='h6'>Materiile:</Typography>
          <List>
            { selectedSubjects.map(subject =>
              <ListItem key={ subject.name }>
                <ListItemAvatar>
                  <BookIcon/>
                </ListItemAvatar>
                <ListItemText primary={ subject.name }/>
              </ListItem>) }
          </List>
        </Grid>
      </Grid>
      <Box className={ classes.buttonsBox }>
        <Button
          className={ classes.button }
          onClick={ onConfirm }
          variant="contained"
          size="small"
          startIcon={ <NextIcon/> }
          color="primary">
          Confirma
        </Button>
        <Button
          className={ classes.button }
          onClick={ onBack }
          variant="outlined"
          size="small"
          startIcon={ <PrevIcon/> }
          color="default">
          Inapoi
        </Button>
      </Box>
    </Box>
  </>;
};

const mapStateToProps = state => {
  return {
    state: { ...state.initialSetup },
  };
};

export default connect(mapStateToProps)(ConfirmationStep);

