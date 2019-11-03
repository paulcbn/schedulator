import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  loginPaper: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  loginInput: {
    margin: theme.spacing(1, 0),
  },
  loginContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: '80vh',
  },
  errorPaper: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  buttonBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nameBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}));

export default useStyles;
