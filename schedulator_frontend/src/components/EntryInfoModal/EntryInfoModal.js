import { Box, Dialog, DialogContent, DialogTitle, Divider, Typography } from '@material-ui/core';
import TeacherIcon from '@material-ui/icons/Face';
import LocationIcon from '@material-ui/icons/LocationCity';
import FormationIcon from '@material-ui/icons/People';
import React, { useMemo } from 'react';

import { deepGet } from '../../lib/utils';

import useStyles from './styles';

const EntryInfoModal = ({ isOpen, onClose, entry }) => {
  const { subjectName, subjectComponentType, roomName, formationName, teacher } = useMemo(() => ({
    subjectName: deepGet(entry, 'subjectComponent.subject.name', ''),
    subjectComponentType: deepGet(entry, 'subjectComponent.name', ''),
    roomName: deepGet(entry, 'room.name', ''),
    formationName: deepGet(entry, 'formation.name', ''),
    teacher: deepGet(entry, 'teacher', ''),
  }), [entry]);

  const subjectComponentColor = useMemo(() => {
    switch (subjectComponentType) {
      case 'Curs':
        return '#4b4b4b';
      case 'Seminar':
        return '#cd7200';
      default:
        return 'rgba(255,5,0,0.8)';
    }
  }, [subjectComponentType]);

  const classes = useStyles({ subjectComponentColor });

  return <Dialog
    fullWidth={ true }
    maxWidth='sm'
    open={ isOpen }
    onClose={ onClose }
  >
    <DialogTitle>
      <Typography variant='h5' component='span'>{ subjectName }</Typography>
      <Divider/>
      <Typography variant='h6' component='span' className={ classes.subjectComponentColor }>{ subjectComponentType }</Typography>
    </DialogTitle>
    <DialogContent>

      <Box className={ classes.line }>
        <LocationIcon fontSize='large' className={ classes.icon }/>
        <Typography className={ classes.value }>{ roomName }</Typography>
      </Box>
      <Divider/>

      <Box className={ classes.line }>
        <FormationIcon fontSize='large' className={ classes.icon }/>
        <Typography className={ classes.value }>{ formationName }</Typography>
      </Box>
      <Divider/>

      <Box className={ classes.line }>
        <TeacherIcon fontSize='large' className={ classes.icon }/>
        <Typography className={ classes.value }>{ teacher }</Typography>
      </Box>
    </DialogContent>
  </Dialog>;
};

export default EntryInfoModal;
