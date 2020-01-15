import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    position: 'relative',
  },
  addButton: {
    margin: theme.spacing(1,3),
  },
}));
export const useEntryItemStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
  deleteButton: {
    margin: theme.spacing(1),
  },
}));
export const useEntryFieldStyles = makeStyles(theme => ({
  field: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));
export const useAddCustomEntryModalStyles = makeStyles(theme => ({
  field: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  timePickerBox: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  timePicker: {
    margin: theme.spacing(1, 3),
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  titleTypography: {
    margin: theme.spacing(2),
  },
  dialogTitle: {
    paddingTop: theme.spacing(2),
  },
}));
export const useTextEntryFieldStyles = makeStyles(theme => ({
  textEntryField: {
    margin: theme.spacing(1, 3),
  },
}));
export default useStyles;
