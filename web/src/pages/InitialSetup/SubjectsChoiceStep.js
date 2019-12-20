import { Box, Button, Checkbox, List, ListItem, ListItemIcon, ListItemText, Paper } from '@material-ui/core';
import PrevIcon from '@material-ui/icons/NavigateBefore';
import NextIcon from '@material-ui/icons/NavigateNext';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import CenteredCircularProgress from '../../components/CenteredCircularProgress/CenteredCircularProgress';
import { useSubjectsChoiceStyles } from './styles';


const SubjectsChoiceStep = ({ state: { subjects, subjectsErrors, subjectsLoading }, onSubjectsChosen, onBack }) => {
  const classes = useSubjectsChoiceStyles();

  const [ checked, setChecked ] = useState([]);

  const handleContinue = () => {
    onSubjectsChosen(checked);
  };

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [ ...checked ];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };


  if (subjectsLoading)
    return <CenteredCircularProgress/>;

  return <>
    <Box className={ classes.box }>
      {/*TODO WTF STYLE*/}
      <Paper className={ classes.paper } style={ { overflow: 'auto' } }>
        <List dense component="div" role="list">
          { subjects.map(subject => {
            return (
              <ListItem key={ subject.sid } role="listitem" button onClick={ handleToggle(subject) }>
                <ListItemIcon>
                  <Checkbox checked={ checked.indexOf(subject) !== -1 } tabIndex={ -1 } disableRipple/>
                </ListItemIcon>
                <ListItemText id={ subject.sid } primary={ subject.name }/>
              </ListItem>
            );
          }) }
        </List>
      </Paper>

      <Box className={ classes.buttonsBox }>
        <Button
          className={ classes.button }
          onClick={ handleContinue }
          variant="contained"
          size="small"
          startIcon={ <NextIcon/> }
          color="primary">
          Continua
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

export default connect(mapStateToProps)(SubjectsChoiceStep);
