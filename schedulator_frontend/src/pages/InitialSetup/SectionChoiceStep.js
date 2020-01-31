import {
  FormControl,
  InputLabel,
  MenuItem,
  Box,
  Select,
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography,
  FormLabel,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import NextIcon from '@material-ui/icons/NavigateNext';
import React, { useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { initialSetup } from '../../lib/actions';
import { useSectionChoiceStyles } from './styles';

const SectionChoiceStep = ({ loadSections, state: { sections, sectionsErrors, sectionsLoading }, onSectionChosen }) => {
  const classes = useSectionChoiceStyles();

  const [ selectedSection, setSelectedSection ] = useState('');
  const [ selectedYear, setSelectedYear ] = useState('');
  const [ selectedDegree, setSelectedDegree ] = useState('');

  const yearChoices = useMemo(() => {
    setSelectedYear('');
    return [ ...new Set(sections.filter(({ type }) => type === selectedDegree).map(({ year }) => year)) ].sort();
  }, [ sections, selectedDegree ]);

  const sectionChoices = useMemo(() => {
    setSelectedSection('');
    return sections.filter(({ year, type }) => year === selectedYear && type === selectedDegree).sort((a, b) => a.name.localeCompare(b.name));
  }, [ selectedYear, selectedDegree, sections ]);

  useEffect(() => {
    loadSections();
  }, [ loadSections ]);

  const handleSelectDegree = event => {
    setSelectedDegree(event.target.value);
  };

  const handleSelectYear = event => {
    setSelectedYear(event.target.value);
  };

  const handleSelectSection = event => {
    setSelectedSection(event.target.value);
  };

  const handleContinue = () => {
    onSectionChosen(selectedSection);
  };
  if (sectionsLoading)
    return <Typography>Sections loading.</Typography>;

  return <>
    <Box className={ classes.box }>
      <FormControl component="fieldset" className={ classes.formControl }>
        <FormLabel component="legend">Nivel studii</FormLabel>
        <RadioGroup row value={ selectedDegree } onChange={ handleSelectDegree }>
          <FormControlLabel value="B" control={ <Radio/> } label="Licență"/>
          <FormControlLabel value="M" control={ <Radio/> } label="Master"/>
        </RadioGroup>
      </FormControl>

      <FormControl className={ classes.formControl }>
        <InputLabel>Anul</InputLabel>
        <Select
          value={ selectedYear }
          disabled={ yearChoices.length === 0 }
          onChange={ handleSelectYear }
        >
          { [ ...yearChoices ].map(year => <MenuItem key={ year } value={ year }>{ year }</MenuItem>) }
        </Select>
      </FormControl>

      <FormControl className={ classes.formControl }>
        <InputLabel>Sectia</InputLabel>
        <Select
          value={ selectedSection }
          disabled={ sectionChoices.length === 0 }
          onChange={ handleSelectSection }
        >
          { [ ...sectionChoices ].map(section =>
            <MenuItem key={ section.id } value={ section }>{ section.name }</MenuItem>) }
        </Select>
      </FormControl>
      <Box className={ classes.buttonsBox }>
        <Button
          className={ classes.button }
          disabled={ selectedSection === '' }
          size="small"
          onClick={ handleContinue }
          variant="contained"
          startIcon={ <NextIcon/> }
          color="primary">
          Continua
        </Button>
      </Box>
    </Box>
  </>;
};
const mapStateToProps = state => {
  return {
    state: { ...state.initialSetup },
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadSections: () => {
      return dispatch(initialSetup.loadSections());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SectionChoiceStep);

