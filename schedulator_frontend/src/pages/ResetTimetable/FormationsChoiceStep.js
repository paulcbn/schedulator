import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import NextIcon from '@material-ui/icons/NavigateNext';
import PrevIcon from '@material-ui/icons/NavigateBefore';
import React, { useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { useFormationsChoiceStyles } from './styles';

const FormationsChoiceStep = ({ state: { formations, formationsErrors, formationsLoading }, onFormationsChosen, onBack }) => {
  const classes = useFormationsChoiceStyles();

  const [ selectedSection, setSelectedSection ] = useState('');
  const [ selectedGroup, setSelectedGroup ] = useState('');
  const [ selectedSemigroup, setSelectedSemigroup ] = useState('');

  const selectedFormations = useMemo(() => [ selectedSection, selectedGroup, selectedSemigroup ].filter(value => value !== ''),
    [ selectedSection, selectedGroup, selectedSemigroup ]);
  const [ sectionChoices, groupChoices ] = useMemo(() =>
      [
        formations.filter(f => f.formationType === 'sect').sort((a, b) => a.name.localeCompare(b.name)),
        formations.filter(f => f.formationType === 'grup').sort((a, b) => a.name.localeCompare(b.name)) ]
    , [ formations ]);
  const semigroupChoices = useMemo(() => {
    setSelectedSemigroup('');
    return formations
      .filter(f => f.formationType === 'semi' && (selectedGroup === '' || f.name.includes(selectedGroup.name)))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [ formations, selectedGroup ]);


  useEffect(() => {
    if (sectionChoices.length === 1)
      setSelectedSection(sectionChoices[0]);
  }, [ sectionChoices, setSelectedSection ]);
  useEffect(() => {
    if (groupChoices.length === 1)
      setSelectedGroup(groupChoices[0]);
  }, [ groupChoices, setSelectedGroup ]);
  useEffect(() => {
    if (semigroupChoices.length === 1)
      setSelectedSemigroup(semigroupChoices[0]);
  }, [ semigroupChoices, setSelectedSemigroup ]);


  const handleSelectSection = event => {
    setSelectedSection(event.target.value);
  };

  const handleSelectGroup = event => {
    setSelectedGroup(event.target.value);
  };

  const handleSelectSemigroup = event => {
    setSelectedSemigroup(event.target.value);
  };

  const handleContinue = () => {
    onFormationsChosen(selectedFormations);
  };

  function renderFormationSelect(name, selectOptions, currentValue, changeHandler) {
    if (selectOptions.length === 0)
      return null;
    const disabled = selectOptions.indexOf(currentValue) !== -1 && selectOptions.length === 1;
    return <FormControl className={ classes.formControl } disabled={ disabled }>
      <InputLabel>{ name }</InputLabel>
      <Select
        value={ currentValue }
        onChange={ changeHandler }
      >
        { [ ...selectOptions ].map(formation =>
          <MenuItem key={ formation.name } value={ formation }>{ formation.name }</MenuItem>) }
      </Select>
    </FormControl>;
  }

  if (formationsLoading)
    return <Typography>Formations loading.</Typography>;

  return <>
    <Box className={ classes.box }>
      { renderFormationSelect('Intreaga sectie', sectionChoices, selectedSection, handleSelectSection) }
      { renderFormationSelect('Grupa', groupChoices, selectedGroup, handleSelectGroup) }
      { renderFormationSelect('Semigrupa', semigroupChoices, selectedSemigroup, handleSelectSemigroup) }
      <Box className={ classes.buttonsBox }>
        <Button
          className={ classes.button }
          onClick={ handleContinue }
          variant="contained"
          size="small"
          startIcon={ <NextIcon/> }

          color="primary">
          Continua
        </Button>
        <Button
          className={ classes.button }
          onClick={ onBack }
          variant="text"
          size="small"
          startIcon={ <PrevIcon/> }
          color="default">
          Inapoi
        </Button>
      </Box>
    </Box>
  </>;
};

const mapStateToProps = state => {
  return {
    state: { ...state.resetTimetable },
  };
};

export default connect(mapStateToProps)(FormationsChoiceStep);

