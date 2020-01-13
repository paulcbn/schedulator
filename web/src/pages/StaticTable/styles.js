import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',

    flexGrow: 1,
  },
  topBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: theme.spacing(1),
  },
  switchBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  typography: {
    margin: theme.spacing(1, 0, 0, 1),
  },
}));

export default useStyles;
