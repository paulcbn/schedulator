import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  subjectComponentColor: {
    color: ({ subjectComponentColor }) => subjectComponentColor,
  },
  line: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  typography: {
    margin: theme.spacing(1),
  },
  value: {
    margin: theme.spacing(1),
    fontSize: '1.2rem',
  },

}));

export default useStyles;
