import { Dialog } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';

import React, { useMemo } from 'react';
import { OverlayCircularProgress } from '../../components/OverlayCircularProgress';
import { deepGet } from '../../lib';
import EntryRow from './EntryRow';
import { compareTimetableEntriesByDay } from './sortUtils';
import { useSubjectComponentModalStyles } from './styles';


const SubjectComponentModal = ({ subjectComponentState, subjectComponentStateLoading, onAddEntry, onDeleteEntry, isOpen, onClose }) => {
  const classes = useSubjectComponentModalStyles();
  const { owned, subjectName, componentType } = useMemo(() => ({
    owned: deepGet(subjectComponentState, 'owned', []).sort(compareTimetableEntriesByDay),
    notOwned: deepGet(subjectComponentState, 'notOwned', []).sort(compareTimetableEntriesByDay),
    subjectName: deepGet(subjectComponentState, 'subjectComponent.subject.name', ''),
    componentType: deepGet(subjectComponentState, 'subjectComponent.name', ''),
  }), [ subjectComponentState ]);

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
      <OverlayCircularProgress show={ subjectComponentStateLoading } color={ 'secondary' } circularSize={ '3rem' }/>
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

export default SubjectComponentModal;
