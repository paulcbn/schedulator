import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  appBar: {
    padding: theme.spacing(0.7),
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    flexGrow: 1,
    color: theme.palette.custom.layout.title,
    overflow: 'hidden',
  },
  logoutButton: {
    margin: theme.spacing(0.2),
  },
  sLetter: {
    color: theme.palette.primary.dark,
  },
  avatar: {
    margin: theme.spacing(0.2),
    background: theme.palette.primary.dark,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 auto',
    padding: 0,
    overflowY: 'auto',
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
}));

export const useLayoutHeaderStyles = makeStyles(theme => ({
  appBar: {
    padding: theme.spacing(0.7),
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    flexGrow: 1,
    color: theme.palette.custom.layout.title,
    overflow: 'hidden',
  },
  button: {
    margin: theme.spacing(0.2),
  },
  sLetter: {
    color: theme.palette.custom.layout.sLetter,
  },
  avatar: {
    margin: theme.spacing(0.2),
    background: theme.palette.primary.dark,
  },
}));

export const useLayoutNavigationStyles = makeStyles(theme => ({}));

export default useStyles;
