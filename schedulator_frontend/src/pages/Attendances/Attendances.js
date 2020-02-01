import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { AddEnrollmentModal, ConfirmationModal, OverlayCircularProgress } from '../../components';
import Layout from '../../components/Layout/Layout';
import { deepGet } from '../../lib';
import { enrollmentManager } from '../../lib/actions';
import { useModal } from '../../lib/hooks';
import AddEntryModal from './AddEntryModal';
import { useAttendancesStyles } from './styles';
import SubjectCard from './SubjectCard';
import SubjectComponentModal from './SubjectComponentModal';

const Attendances = ({
                       loadEnrollmentState,
                       currentEnrollmentState,
                       currentEnrollmentStateLoading,
                       loadSubjectComponentState,
                       subjectComponentStateLoading,
                       subjectComponentState,
                       addEntriesToSelf,
                       clearComponentState,
                       removeEntryForSelf,
                       removeEnrollmentForSelf,
                     }) => {
  const classes = useAttendancesStyles();
  const { close: closeSubjectComponentModal, open: openSubjectComponentModal, isOpen: isSubjectComponentModalOpen } = useModal();
  const { close: closeAddEntryModal, open: openAddEntryModal, isOpen: isAddEntryModalOpen } = useModal();
  const { close: closeConfirmModal, open: openConfirmModal, isOpen: isConfirmModalOpen, data: confirmModalData } = useModal();
  const { close: closeAddEnrollmentModal, open: openAddEnrollmentModal, isOpen: isAddEnrollmentModalOpen } = useModal();

  const { notOwned, componentType, subjectName } = useMemo(() => ({
    notOwned: deepGet(subjectComponentState, 'notOwned', []),
    componentType: deepGet(subjectComponentState, 'subjectComponent.name', ''),
    subjectName: deepGet(subjectComponentState, 'subjectComponent.subject.name', ''),
  }), [ subjectComponentState ]);


  const handleDeleteSubject = (subject) => {
    const subjectId = deepGet(subject, 'sid', null);
    removeEnrollmentForSelf(subjectId);
  };

  const handleEditComponent = (component) => {
    const subjectComponentId = deepGet(component, 'id');
    if (subjectComponentId === undefined)
      return;

    clearComponentState();
    loadSubjectComponentState(subjectComponentId);
    openSubjectComponentModal();
  };

  const handleAddEntry = (entries) => {
    addEntriesToSelf(entries.map(entry => deepGet(entry, 'id', null)));
    closeAddEntryModal();
  };

  const handleDeleteEntry = (entry) => {
    const entryId = deepGet(entry, 'id', null);
    removeEntryForSelf(entryId);
  };

  useEffect(() => {
    loadEnrollmentState();
  }, [ loadEnrollmentState ]);


  return <Layout otherLabel="Materiile mele">
    <Box className={classes.subjectsBox}>
      <Typography variant="h4">Materiile la care esti inscris</Typography>
      <Divider/>
      <Box className={classes.subjectComponentBox}>
        <OverlayCircularProgress show={currentEnrollmentStateLoading} color={'secondary'} circularSize={'6rem'}/>
        {(currentEnrollmentState || []).map(value => <SubjectCard
            key={value.sid}
            enrollmentData={value}
            onDeleteSubject={openConfirmModal}
            onEditComponent={handleEditComponent}
          />,
        )}
      </Box>
      <Button onClick={openAddEnrollmentModal} variant={'contained'} color={'primary'}>Adauga materii</Button>
    </Box>
    <SubjectComponentModal
      isOpen={isSubjectComponentModalOpen}
      onClose={closeSubjectComponentModal}
      onAddEntry={openAddEntryModal}
      onDeleteEntry={handleDeleteEntry}
      subjectComponentStateLoading={subjectComponentStateLoading}
      subjectComponentState={subjectComponentState}
    />
    <AddEntryModal
      isOpen={isAddEntryModalOpen}
      onClose={closeAddEntryModal}
      onAddEntry={handleAddEntry}
      subjectComponentStateLoading={subjectComponentStateLoading}
      notOwned={notOwned}
      componentType={componentType}
      subjectName={subjectName}
    />
    <ConfirmationModal
      isOpen={isConfirmModalOpen}
      onClose={closeConfirmModal}
      onConfirm={handleDeleteSubject}
      data={confirmModalData}
      title={'Esti sigur ca vrei sa renunti la materie?'}
      text={'Toate participarile la aceasta materie vor fi sterse din orarul tau.'}
    />
    <AddEnrollmentModal
      isOpen={isAddEnrollmentModalOpen}
      onClose={closeAddEnrollmentModal}
    />
  </Layout>;
};

const mapStateToProps = state => {
  return {
    currentEnrollmentState: state.enrollmentManager.currentEnrollmentState,
    currentEnrollmentStateLoading: state.enrollmentManager.currentEnrollmentStateLoading,
    currentEnrollmentStateErrors: state.enrollmentManager.currentEnrollmentStateErrors,

    subjectComponentState: state.enrollmentManager.subjectComponentState,
    subjectComponentStateLoading: state.enrollmentManager.subjectComponentStateLoading,
    subjectComponentStateErrors: state.enrollmentManager.subjectComponentStateErrors,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadEnrollmentState: () => {
      return dispatch(enrollmentManager.loadEnrollmentState());
    },
    loadSubjectComponentState: (subjectComponentId) => {
      return dispatch(enrollmentManager.loadSubjectComponentState(subjectComponentId));
    },
    addEntriesToSelf: (entryIds) => {
      return dispatch(enrollmentManager.addEntriesToSelf(entryIds));
    },
    clearComponentState: () => {
      return dispatch(enrollmentManager.clearComponentState());
    },
    removeEntryForSelf: (entryId) => {
      return dispatch(enrollmentManager.removeEntryForSelf(entryId));
    },
    removeEnrollmentForSelf: (subjectId) => {
      return dispatch(enrollmentManager.removeEnrollmentForSelf(subjectId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Attendances);
