import { Dialog } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import TeacherIcon from '@material-ui/icons/Face';
import RoomIcon from '@material-ui/icons/LocationCity';
import FormationIcon from '@material-ui/icons/People';
import TimeIcon from '@material-ui/icons/Schedule';
import WeekDayIcon from '@material-ui/icons/Today';
import * as moment from 'moment';

import React, { useMemo } from 'react';
import { OverlayCircularProgress } from "../../components/OverlayCircularProgress";
import { deepGet, weekDayCodes } from '../../lib';
import { useSubjectComponentModalRowStyles, useSubjectComponentModalStyles } from './styles';


const SubjectComponentModal = ({ subjectComponentState, subjectComponentStateLoading, onAddEntry, onDeleteEntry, isOpen, onClose }) => {
  const classes = useSubjectComponentModalStyles();
  const { owned, subjectName, componentType } = useMemo(() => ({
    owned: deepGet(subjectComponentState, 'owned', []),
    notOwned: deepGet(subjectComponentState, 'notOwned', []),
    subjectName: deepGet(subjectComponentState, 'subjectComponent.subject.name', ''),
    componentType: deepGet(subjectComponentState, 'subjectComponent.name', ''),
  }), [subjectComponentState]);

  return <Dialog
    fullWidth={ true }
    maxWidth='lg'
    open={ isOpen }
    onClose={ onClose }
    className={ classes.root }
  >
    <DialogTitle>
      <Typography variant='h4' component="span" className={ classes.titleTypography }>{ subjectName }</Typography>
      <Divider/>
      <Typography variant='h5' component="span" className={ classes.titleTypography }>{ componentType }</Typography>
    </DialogTitle>
    <DialogContent>
      <OverlayCircularProgress show={ subjectComponentStateLoading } color={ "secondary" } circularSize={ "3rem" }/>
      { owned.map(entry => <EntryRow key={ entry.id } entry={ entry } onDelete={ () => onDeleteEntry(entry) }/>) }
      { owned.length === 0 && !subjectComponentStateLoading &&
      <Typography variant={ 'subtitle1' } color={ 'textSecondary' } className={ classes.emptyTypography }>
        Momentan nu ti-ai ales nicio participare pentru acest { componentType.toLowerCase() }.
      </Typography>
      }
    </DialogContent>
    <DialogActions className={ classes.fabBox }>
      <Fab color="primary" onClick={ onAddEntry }>
        <AddIcon/>
      </Fab>
    </DialogActions>
  </Dialog>;
};

const EntryRow = ({ entry, onDelete }) => {
  const classes = useSubjectComponentModalRowStyles();

  const { startTime, endTime, roomName, teacher, formation, weekDay } = useMemo(() => {
    const startMoment = moment.utc(moment.duration(deepGet(entry, 'startTime', '')).asMilliseconds());
    const endMoment = moment.utc(moment.duration(deepGet(entry, 'endTime', '')).asMilliseconds());
    const weekDayCode = deepGet(entry, 'weekDay', '');
    return {
      startTime: startMoment.format('HH:mm'),
      endTime: endMoment.format('HH:mm'),
      formation: deepGet(entry, 'formation.name', 'Unknown'),
      teacher: deepGet(entry, 'teacher', 'Unknown'),
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

    <Box className={ classes.buttonBox }>
      <IconButton onClick={ onDelete } size='small' className={ classes.deleteButton }>
        <DeleteIcon/>
      </IconButton>
    </Box>
  </Box>;
};

export default SubjectComponentModal;
