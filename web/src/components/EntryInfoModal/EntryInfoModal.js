import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import React, { useMemo } from 'react';
import FormationIcon from '@material-ui/icons/People';
import LocationIcon from '@material-ui/icons/LocationCity';
import TeacherIcon from '@material-ui/icons/Face';
import { deepGet } from '../../lib';
import useStyles from './styles';

const EntryInfoModal = ({ isOpen, onClose, entry }) => {
  const { subjectName, subjectComponentType, roomName, formationName, teacher } = useMemo(() => ({
    subjectName: deepGet(entry, 'subjectComponent.subject.name', ''),
    subjectComponentType: deepGet(entry, 'subjectComponent.name', ''),
    roomName: deepGet(entry, 'room.name', ''),
    formationName: deepGet(entry, 'formation.name', ''),
    teacher: deepGet(entry, 'teacher', ''),
  }), [ entry ]);

  const subjectComponentColor = useMemo(() => {
    switch (subjectComponentType) {
      case 'Curs':
        return '#4b4b4b';
      case 'Seminar':
        return '#cd7200';
      default:
        return 'rgba(255,5,0,0.8)';
    }
  }, [ subjectComponentType ]);

  const classes = useStyles({ subjectComponentColor });

  return <Dialog
    fullWidth={ true }
    maxWidth='sm'
    open={ isOpen }
    onClose={ onClose }
  >
    <DialogTitle>
      <Typography variant='h5'>{ subjectName }</Typography>
      <Divider/>
      <Typography variant='h6' className={ classes.subjectComponentColor }>{ subjectComponentType }</Typography>
    </DialogTitle>
    <DialogContent>
      <Box className={ classes.line }>
        <FormationIcon/>
        <Typography className={ classes.typography }>Formatia:&nbsp;</Typography>
        <Typography className={ classes.value } color='textSecondary'>{ formationName }</Typography>
      </Box>

      <Box className={ classes.line }>
        <LocationIcon/>
        <Typography className={ classes.typography }>Sala:&nbsp;</Typography>
        <Typography className={ classes.value } color='textSecondary'>{ roomName }</Typography>
      </Box>

      <Box className={ classes.line }>
        <TeacherIcon/>
        <Typography className={ classes.typography }>Cadrul didactic:&nbsp;</Typography>
        <Typography className={ classes.value } color='textSecondary'>{ teacher }</Typography>
      </Box>
    </DialogContent>
  </Dialog>;
};

export default EntryInfoModal;
