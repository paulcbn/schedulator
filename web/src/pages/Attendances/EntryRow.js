import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import * as moment from 'moment';
import React, { useMemo } from 'react';
import { deepGet, weekDayCodes } from '../../lib';
import { useEntryRowStyles } from './styles';
import DeleteIcon from '@material-ui/icons/Delete';
import TeacherIcon from '@material-ui/icons/Face';
import RoomIcon from '@material-ui/icons/LocationCity';
import FormationIcon from '@material-ui/icons/People';
import TimeIcon from '@material-ui/icons/Schedule';
import WeekDayIcon from '@material-ui/icons/Today';

const EntryRow = ({ entry, onDelete }) => {
  const classes = useEntryRowStyles();

  const { startTime, endTime, roomName, teacher, formation, weekDay, frequency } = useMemo(() => {
    const startMoment = moment.utc(moment.duration(deepGet(entry, 'startTime', '')).asMilliseconds());
    const endMoment = moment.utc(moment.duration(deepGet(entry, 'endTime', '')).asMilliseconds());
    const weekDayCode = deepGet(entry, 'weekDay', '');
    const frequencyValue = deepGet(entry, 'frequency', 'all');
    let frequency = '';
    if (frequencyValue === 'odd')
      frequency = 'Sapt. 1';
    else if (frequencyValue === 'evn')
      frequency = 'Sapt. 2';

    return {
      startTime: startMoment.format('HH:mm'),
      endTime: endMoment.format('HH:mm'),
      formation: deepGet(entry, 'formation.name', 'Unknown'),
      teacher: deepGet(entry, 'teacher', 'Unknown'),
      roomName: deepGet(entry, 'room.name', 'Unknown'),
      weekDay: weekDayCodes[weekDayCode].name,
      frequency,
    };
  }, [ entry ]);


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
        <Typography  component={'span'} variant={ 'h6' } className={ classes.weekDayTypography }>
          { weekDay }
        </Typography>
        <Typography component={'span'} variant={ 'body1' } color={ 'textSecondary' } className={ classes.frequencyTypography }>
          { frequency }
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
    { typeof onDelete === 'function' &&
    <Box className={ classes.buttonBox }>
      <IconButton onClick={ onDelete } size='small' className={ classes.deleteButton }>
        <DeleteIcon/>
      </IconButton>
    </Box> }
  </Box>;
};

export default EntryRow;
