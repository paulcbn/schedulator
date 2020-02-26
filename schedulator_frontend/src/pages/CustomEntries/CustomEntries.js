import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { ConfirmationModal, Layout, OverlayCircularProgress } from '../../components';
import { deepGet } from '../../lib/utils';
import { customTimetableEntries } from '../../lib/actions';
import { useModal } from '../../lib/hooks';
import AddCustomEntryModal from './AddCustomEntryModal';
import EntryItem from './EntryItem';
import useStyles from './styles';

const CustomEntries = ({ entries, entriesLoading, removeEntriesLoading, loadCustomData, removeCustomEntry, addCustomEntry, addCustomEntryError, addEntryError, addEntryLoading }) => {
  const classes = useStyles();
  const { close: closeConfirmModal, open: openConfirmModal, isOpen: isConfirmModalOpen, data: confirmModalData } = useModal();
  const { close: closeAddCustomEntryModal, open: openAddCustomEntryModal, isOpen: isAddCustomEntryModalOpen } = useModal();
  useEffect(() => {
    loadCustomData();
  }, [ loadCustomData ]);

  const handleDelete = (entryId) => {
    removeCustomEntry(entryId);
  };
  const handleAdd = (entry) => {
    const formattedStartTime = moment(deepGet(entry, 'startTime')).format('HH:mm');
    const formattedEndTime = moment(deepGet(entry, 'endTime')).format('HH:mm');
    addCustomEntry({ ...entry, startTime: formattedStartTime, endTime: formattedEndTime });
  };
  const limitAchieved = useMemo(() => (entries || []).length >= 15, [ entries ]);

  return <Layout otherLabel={ 'Ore auxiliare' }>
    <Box className={ classes.root }>
      { (entries || []).map(entry => <EntryItem
        key={ entry.id } entry={ entry }
        onDelete={ () => openConfirmModal(entry.id) }/>) }
      <OverlayCircularProgress show={ entriesLoading || addEntryLoading || removeEntriesLoading }/>
    </Box>
    <Button onClick={ () => openAddCustomEntryModal() } color={ 'primary' } variant={ 'contained' }
            className={ classes.addButton } disabled={ limitAchieved }>
      Adauga intrare
    </Button>
    { limitAchieved && <Typography variant={ 'h5' }>
      Ai atins limita de 15 intrari personalizate!
    </Typography> }
    <ConfirmationModal
      isOpen={ isConfirmModalOpen }
      onClose={ closeConfirmModal }
      onConfirm={ handleDelete }
      data={ confirmModalData }
      title={ 'Esti sigur ca vrei sa renunti la intrare?' }
      text={ 'Aceasta va fi stearsa permanent din orar.' }
    />
    <AddCustomEntryModal
      isOpen={ isAddCustomEntryModalOpen }
      onClose={ closeAddCustomEntryModal }
      onAddEntry={ handleAdd }
      error={ addEntryError }
      loading={ addEntryLoading }
    />
  </Layout>;
};
const mapStateToProps = state => {
  return {
    entries: state.customTimetableEntries.customTimetableEntries,
    entriesLoading: state.customTimetableEntries.customTimetableEntriesLoading,
    removeEntriesLoading: state.customTimetableEntries.removeCustomTimetableEntryLoading,
    addEntriesLoading: state.customTimetableEntries.addCustomTimetableEntryLoading,
    addEntryError: state.customTimetableEntries.addCustomTimetableEntryError,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadCustomData: () => {
      return dispatch(customTimetableEntries.loadCustomData());
    },
    removeCustomEntry: (entryId) => {
      return dispatch(customTimetableEntries.removeCustomEntry(entryId));
    },
    addCustomEntry: (entry) => {
      return dispatch(customTimetableEntries.addCustomEntry(entry));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomEntries);
