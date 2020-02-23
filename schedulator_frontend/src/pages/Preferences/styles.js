import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  title: {
    margin: theme.spacing(1),
  },
  suggestionsPaper: {
    padding: theme.spacing(2),
    margin: theme.spacing(1),
  },
  email: {
    fontWeight: 'bold',
  },
}));

export const useMenuItemStyles = makeStyles(theme => ({
  header: {
    margin: theme.spacing(1),
  },
  paper: {
    position: 'relative',
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
  content: {
    margin: theme.spacing(1),
  },
  buttonBox: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    margin: theme.spacing(0, 1),
  },

}));


export default useStyles;
