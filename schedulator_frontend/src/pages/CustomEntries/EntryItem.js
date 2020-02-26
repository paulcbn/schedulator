import { Paper, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';
import React, { useMemo } from 'react';
import { weekDayCodes } from '../../lib/config';
import { deepGet } from '../../lib/utils';
import { useEntryFieldStyles, useEntryItemStyles } from './styles';

const covertSecondsToMoment = (seconds) => {
  return moment.utc(seconds * 1000);
};

const EntryField = ({ title, value, hide }) => {
  const classes = useEntryFieldStyles();
  if (!!hide)
    return null;

  return <>
    <Box className={ classes.field }>
      <Grid item container direction={ 'row' }>
        <Grid item sm={ 4 }>
          <Typography variant={ 'h5' } color={ 'textSecondary' }>
            { title }:
          </Typography>
        </Grid>
        <Grid item sm={ 8 }>
          <Typography variant={ 'h5' }>
            { value }
          </Typography>
        </Grid>
      </Grid>
    </Box>
    <Divider/>
  </>;
};

const EntryItem = ({ entry, onDelete }) => {
  const classes = useEntryItemStyles();
  const { startTime, endTime, weekDay, frequency, roomName, formationName, teacher, subjectComponentName, subjectName } = useMemo(() => {
    return {
      startTime: covertSecondsToMoment(deepGet(entry, 'startTime', 0)).format('HH:mm'),
      endTime: covertSecondsToMoment(deepGet(entry, 'endTime', 0)).format('HH:mm'),
      weekDay: deepGet(entry, 'weekDay', '-'),
      frequency: deepGet(entry, 'frequency', '-'),
      roomName: deepGet(entry, 'roomName', '-'),
      formationName: deepGet(entry, 'formationName', '-'),
      teacher: deepGet(entry, 'teacher', '-'),
      subjectComponentName: deepGet(entry, 'subjectComponentName', '-'),
      subjectName: deepGet(entry, 'subjectName', '-'),
    };
  }, [ entry ]);

  return <Paper className={ classes.root }>
    <EntryField title={ 'Nume' } value={ subjectName }/>

    <EntryField title={ 'Tip' } value={ subjectComponentName }/>

    <EntryField title={ 'Ziua' } value={ deepGet(weekDayCodes[weekDay], 'name', '-') }/>

    <EntryField title={ 'Frecventa' } value={ frequency === 'odd' ? 'Sapt. 1' : 'Sapt. 2' }
                hide={ frequency !== 'odd' && frequency !== 'evn' }/>
    <EntryField title={ 'Ora' } value={ `${ startTime } -> ${ endTime }` }/>
    <EntryField title={ 'Sala' } value={ roomName }/>
    <EntryField title={ 'Formatia' } value={ formationName }/>
    <EntryField title={ 'Profesor' } value={ teacher }/>
    <Button variant={ 'contained' } color={ 'primary' } onClick={ () => onDelete() }
            className={ classes.deleteButton }>
      <DeleteIcon/>Sterge
    </Button>
  </Paper>;
};

export default EntryItem;
