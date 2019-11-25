import { Paper, Step, StepLabel, Stepper, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import { initialSetup } from '../../lib/actions';
import ConfirmationStep from './ConfirmationStep';
import FormationsChoiceStep from './FormationsChoiceStep';
import SectionChoiceStep from './SectionChoiceStep';
import useStyles from './styles';
import SubjectsChoiceStep from './SubjectsChoiceStep';

const steps = [ 'Alege anul si sectia', 'Alege formatia', 'Alege materiile' ];

const InitialSetup = ({ selectSection, selectFormations, selectSubjects, confirmSelection }) => {
  const classes = useStyles();
  const history = useHistory();
  const [ activeStep, setActiveStep ] = useState(0);

  function handleSectionChosen(section) {
    selectSection(section);
    setActiveStep(1);
  }

  function handleBack() {
    setActiveStep(prev => prev - 1);
  }

  function handleFormationsChosen(formations) {
    selectFormations(formations);
    setActiveStep(2);
  }

  function handleSubjectsChosen(subjects) {
    selectSubjects(subjects);
    setActiveStep(3);
  }

  function handleConfirm() {
    confirmSelection();
    history.push('/');
  }

  function renderCurrentStepPage() {
    switch (activeStep) {
      case  0:
        return <SectionChoiceStep onSectionChosen={ handleSectionChosen }/>;
      case 1:
        return <FormationsChoiceStep onFormationsChosen={ handleFormationsChosen } onBack={ handleBack }/>;
      case 2:
        return <SubjectsChoiceStep onSubjectsChosen={ handleSubjectsChosen } onBack={ handleBack }/>;
      case 3:
        return <ConfirmationStep onConfirm={ handleConfirm } onBack={ handleBack }/>;
      default:
        return <Typography>An error occurred</Typography>;
    }
  }

  return <Layout>
    <Paper className={ classes.paper }>
      <Stepper activeStep={ activeStep }>
        { steps.map(label => {
          return (
            <Step key={ label }>
              <StepLabel>{ label }</StepLabel>
            </Step>
          );
        }) }
      </Stepper>
      <Box className={ classes.stepBox }>
        { renderCurrentStepPage() }
      </Box>
    </Paper>
  </Layout>;
};

const mapStateToProps = state => {
  return {
    state: { ...state.initialSetup },
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectSection: (section) => {
      return dispatch(initialSetup.selectSection(section));
    },
    selectFormations: (formations) => {
      return dispatch(initialSetup.selectFormations(formations));
    },
    selectSubjects: (subjects) => {
      return dispatch(initialSetup.selectSubjects(subjects));
    },
    confirmSelection: () => {
      return dispatch(initialSetup.confirmSelection());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InitialSetup);
