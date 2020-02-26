import { Dialog, InputLabel, TextField } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import { KeyboardTimePicker } from '@material-ui/pickers';
import moment from 'moment';

import React, { useState } from 'react';
import { OverlayCircularProgress } from '../../components/OverlayCircularProgress';
import { deepGet, weekDayCodes } from '../../lib';
import { useAddCustomEntryModalStyles, useTextEntryFieldStyles } from './styles';

const TextEntryField = ({ value, setValue, label, error, helperText }) => {
  const classes = useTextEntryFieldStyles();
  const handleChange = event => {
    setValue(event.target.value);
  };
  return <TextField
    value={ value }
    onChange={ handleChange }
    label={ label }
    className={ classes.textEntryField }
    error={ error }
    helperText={ helperText }
  />;
};

const SelectEntryField = ({ value, setValue, label, menuItems, error, helperText }) => {
  const classes = useTextEntryFieldStyles();
  const handleChange = event => {
    setValue(event.target.value);
  };
  return <FormControl className={ classes.textEntryField } error={ error }>
    <InputLabel id="sdadas">{ label }</InputLabel>
    <Select
      value={ value }
      onChange={ handleChange }
      labelId={ 'sdadas' }

    >
      { menuItems.map(({ value, label }) => <MenuItem key={ value } value={ value }>{ label }</MenuItem>) }
    </Select>
    <FormHelperText>{ helperText }</FormHelperText>
  </FormControl>;
};

const subjectComponentMenuItems = [
  { value: 'Laborator', label: 'Laborator' },
  { value: 'Seminar', label: 'Seminar' },
  { value: 'Curs', label: 'Curs' },
];
const frequencyMenuItems = [
  { value: 'all', label: 'Toate' },
  { value: 'odd', label: 'Sapt. 1' },
  { value: 'evn', label: 'Sapt. 2' },
];
const weekDaysMenuItems = Object.entries(weekDayCodes)
  .map(([ key, { name } ]) => ({ value: key, label: name }));

const AddCustomEntryModal = ({ isOpen, onClose, onAddEntry, loading, error }) => {
  const classes = useAddCustomEntryModalStyles();
  const [ entry, setEntry ] = useState({
    subjectName: '',
    weekDay: '',
    frequency: '',
    roomName: '',
    subjectComponentName: '',
    formationName: '',
    teacher: '',
    startTime: moment(),
    endTime: moment(),
  });

  return <Dialog
    fullWidth={ true }
    maxWidth='lg'
    open={ isOpen }
    onClose={ onClose }
    className={ classes.dialog }>
    <Box className={ classes.dialogTitle }>
      <Typography variant="h5" component="span" className={ classes.titleTypography }>
        Adauga o intrare personalizata
      </Typography>
    </Box>
    <Box className={ classes.container }>
      <TextEntryField
        value={ entry.subjectName }
        setValue={ (value) => setEntry((old) => ({ ...old, subjectName: value })) }
        label={ 'Nume materie' }
        error={ deepGet(error, 'subjectName') !== undefined }
        helperText={ deepGet(error, 'subjectName.0') }
      />

      <SelectEntryField
        value={ entry.subjectComponentName }
        setValue={ (value) => setEntry((old) => ({ ...old, subjectComponentName: value })) }
        label={ 'Tip' }
        menuItems={ subjectComponentMenuItems }
        error={ deepGet(error, 'subjectComponentName') !== undefined }
        helperText={ deepGet(error, 'subjectComponentName.0') }
      />
      <SelectEntryField
        value={ entry.weekDay }
        setValue={ (value) => setEntry((old) => ({ ...old, weekDay: value })) }
        label={ 'Ziua' }
        menuItems={ weekDaysMenuItems }
        error={ deepGet(error, 'weekDay') !== undefined }
        helperText={ deepGet(error, 'weekDay.0') }
      />
      <SelectEntryField
        value={ entry.frequency }
        setValue={ (value) => setEntry((old) => ({ ...old, frequency: value })) }
        label={ 'Frecventa' }
        menuItems={ frequencyMenuItems }
        error={ deepGet(error, 'frequency') !== undefined }
        helperText={ deepGet(error, 'frequency.0') }
      />

      <KeyboardTimePicker
        className={ classes.timePicker }
        ampm={ false }
        value={ entry.startTime }
        onChange={ (value) => setEntry((old) => ({ ...old, startTime: value })) }
        label={ 'Ora inceput' }
        // error={ deepGet(error,'startTime') !== undefined }
        // helperText={ deepGet(error, 'startTime.0') }
      />

      <KeyboardTimePicker
        className={ classes.timePicker }
        ampm={ false }
        value={ entry.endTime }
        onChange={ (value) => setEntry((old) => ({ ...old, endTime: value })) }
        label={ 'Ora final' }
        // error={ deepGet(error,'endTime') !== undefined }
        // helperText={ deepGet(error, 'endTime.0') }
      />

      <TextEntryField
        value={ entry.teacher }
        setValue={ (value) => setEntry((old) => ({ ...old, teacher: value })) }
        label={ 'Cadru didactic' }
        error={ deepGet(error, 'teacher') !== undefined }
        helperText={ deepGet(error, 'teacher.0') }
      />

      <TextEntryField
        value={ entry.formationName }
        setValue={ (value) => setEntry((old) => ({ ...old, formationName: value })) }
        label={ 'Numele formatiei' }
        error={ deepGet(error, 'formationName') !== undefined }
        helperText={ deepGet(error, 'formationName.0') }
      />

      <TextEntryField
        value={ entry.roomName }
        setValue={ (value) => setEntry((old) => ({ ...old, roomName: value })) }
        label={ 'Locatie' }
        error={ deepGet(error, 'roomName') !== undefined }
        helperText={ deepGet(error, 'roomName.0') }
      />

    </Box>
    <DialogActions className={ classes.confirmBox }>
      <Button variant="contained" color="primary" size={ 'large' } onClick={ () => onAddEntry(entry) }>
        Adauga
      </Button>
    </DialogActions>
    <OverlayCircularProgress show={ loading }/>
  </Dialog>;
};

export default AddCustomEntryModal;
