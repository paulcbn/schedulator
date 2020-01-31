import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  subjectComponentColor: {
    color: ({ subjectComponentColor }) => subjectComponentColor,
  },
  line: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: theme.spacing(1, 0),
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  typography: {},
  value: {
    fontSize: '1.2rem',
  },

}));

export default useStyles;
