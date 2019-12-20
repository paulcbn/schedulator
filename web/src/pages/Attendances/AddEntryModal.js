import { Checkbox, Dialog, List, ListItem, ListItemIcon } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Divider from "@material-ui/core/Divider";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TeacherIcon from '@material-ui/icons/Face';
import RoomIcon from '@material-ui/icons/LocationCity';
import FormationIcon from '@material-ui/icons/People';
import TimeIcon from '@material-ui/icons/Schedule';
import WeekDayIcon from '@material-ui/icons/Today';
import * as moment from 'moment';

import React, { useEffect, useMemo, useState } from 'react';
import CenteredCircularProgress from '../../components/CenteredCircularProgress/CenteredCircularProgress';
import { deepGet, weekDayCodes } from '../../lib';
import { useAddEntryModalStyles, useAddEntryModalRowStyles } from './styles';


const AddEntryModal = ({ notOwned, componentType, subjectName, onAddEntry, isOpen, onClose, loading }) => {
  const classes = useAddEntryModalStyles();

  const [checked, setChecked] = useState([]);

  useEffect(() => setChecked([]), [isOpen]);

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  if (loading)
    return <Dialog
      fullWidth={ true }
      maxWidth='lg'
      open={ isOpen }
      onClose={ onClose }
    >
      <CenteredCircularProgress/>
    </Dialog>;

  return <Dialog
    fullWidth={ true }
    maxWidth='lg'
    open={ isOpen }
    onClose={ onClose }
  >
    <Box className={ classes.dialogTitle }>
      <Typography variant="h4" component="span" className={ classes.titleTypography }>{ subjectName }</Typography>
      <Divider/>
      <Typography variant="h5" component="span" className={ classes.titleTypography }>
        Adauga participari pentru { componentType.toLowerCase() }
      </Typography>
    </Box>
    <DialogContent className={ classes.dialogContent }>

      <List dense component="div">
        { notOwned.map(entry => {
          return (
            <ListItem key={ entry.id } className={ classes.listItem } button onClick={ handleToggle(entry) }>
              <ListItemIcon>
                <Checkbox checked={ checked.indexOf(entry) !== -1 } tabIndex={ -1 } disableRipple/>
              </ListItemIcon>
              <EntryRow entry={ entry }/>
            </ListItem>
          );
        }) }
      </List>

      { notOwned.length === 0 &&
      <Typography variant={ 'subtitle1' } color={ 'textSecondary' } className={ classes.emptyTypography }>
        Nu mai exista ore de ales pentru acest { componentType.toLowerCase() }.
      </Typography>
      }

    </DialogContent>
    <DialogActions className={ classes.confirmBox }>
      <Button variant="contained" color="primary" size={ "large" } onClick={ () => onAddEntry(checked) }>
        Confirma
      </Button>
    </DialogActions>
  </Dialog>;
};

const EntryRow = ({ entry }) => {
  const classes = useAddEntryModalRowStyles();

  const { startTime, endTime, roomName, teacher, formation, weekDay } = useMemo(() => {
    const weekDayCode = deepGet(entry, 'weekDay', '');
    const startMoment = moment.utc(moment.duration(deepGet(entry, 'startTime', '')).asMilliseconds());
    const endMoment = moment.utc(moment.duration(deepGet(entry, 'endTime', '')).asMilliseconds());
    return {
      startTime: startMoment.format('HH:mm'),
      endTime: endMoment.format('HH:mm'),
      teacher: deepGet(entry, 'teacher', 'Unknown'),
      formation: deepGet(entry, 'formation.name', 'Unknown'),
      roomName: deepGet(entry, 'room.name', 'Unknown'),
      weekDay: weekDayCodes[weekDayCode],
    };
  }, [entry]);


  return <Box className={ classes.rowBox }>
    <Grid container className={ classes.gridContainer }>
      <Grid item lg={ 1 } md={ 12 } container className={ classes.gridItem }>
        <FormationIcon/>
        <Typography variant={ 'h6' } className={ classes.formationTypography }>
          { formation }
        </Typography>
      </Grid>
      <Grid item lg={ 2 } md={ 12 } container className={ classes.gridItem }>
        <WeekDayIcon/>
        <Typography variant={ 'h6' } className={ classes.weekDayTypography }>
          { weekDay }
        </Typography>
      </Grid>
      <Grid item lg={ 2 } md={ 12 } container className={ classes.gridItem }>
        <TimeIcon/>
        <Typography variant={ 'h6' } className={ classes.timeTypography }>
          { startTime }&nbsp;-&nbsp;{ endTime }
        </Typography>
      </Grid>
      <Grid item lg={ 2 } md={ 12 } container className={ classes.gridItem }>
        <RoomIcon/>
        <Typography variant={ 'h6' } noWrap className={ classes.roomTypography }>
          { roomName }
        </Typography>
      </Grid>
      <Grid item lg={ 4 } md={ 12 } container className={ classes.gridItem }>
        <TeacherIcon/>
        <Typography variant={ 'h6' } noWrap className={ classes.teacherTypography }>
          { teacher }
        </Typography>
      </Grid>
    </Grid>
  </Box>;
};

export default AddEntryModal;
