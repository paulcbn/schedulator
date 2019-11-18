import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  mainPaper: {
    minHeight: '80vh',
  },
  stepBox: {
    margin: theme.spacing(3),
  },
}));

export const useSectionChoiceStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
  },
  box: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  buttonsBox: {
    display: 'flex',
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export const useFormationsChoiceStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
  },
  box: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  buttonsBox: {
    display: 'flex',
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export const useSubjectsChoiceStyles = makeStyles(theme => ({
  box: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  paper: {
    margin: theme.spacing(1),
  },
  buttonsBox: {
    display: 'flex',
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export const useConfirmationChoiceStyles = makeStyles(theme => ({
  box: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  paper: {
    margin: theme.spacing(1),
  },
  confirmationBox: {
    margin: theme.spacing(1),
  },
  buttonsBox: {
    display: 'flex',
  },
  subtitleBox: {
    display: 'flex',
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export default useStyles;
