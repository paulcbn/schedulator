import { makeStyles } from '@material-ui/core';


export const useTimetableStyle = makeStyles(theme => ({
  mainBox: {
    padding: theme.spacing(1),
  },
  gridBox: {
    height: 800,
    background: '#f9f9f9',
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerBox: {
    height: 60,
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    background: theme.palette.primary.dark,
    color: '#f0f0f0',
    borderBottom: '4px solid',
    borderBottomColor: '#cccccc',
  },
  referenceColumnSpacer: {
    position: 'relative',
    width: 50,
    flexGrow: 0,
    margin: theme.spacing(0, 0.3),

  },
  header: {
    display: 'flex',
    flex: '1 1 0',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    borderLeft: '1px solid #cccccc',
  },
}));

export const useTimetableColumnStyles = makeStyles(theme => ({
  mainBox: {
    position: 'relative',
    // background: '#a5a3ff55',
    flexGrow: 1,
    padding: theme.spacing(0, 0.3),
    borderLeft: '1px solid #cccccc',
  },
}));


export const useTimetableEntryStyle = makeStyles(theme => ({
  entryBox: {
    position: 'absolute',
    display: 'flex',
    padding: theme.spacing(0.2, 0.4),
    justifyContent: 'center',
    top: ({ top }) => top,
    bottom: ({ bottom }) => bottom,
    left: ({ left }) => left,
    right: ({ right }) => right,
  },
  entryPaper: {
    flexGrow: 1,
    background: '#ffad55CC',
    overflow: 'hidden',
  },
  buttonBase: {
    width: '100%',
    height: '100%',
  },
}));

export const useReferenceEntryStyle = makeStyles(theme => ({
  entryBox: {
    position: 'absolute',
    height: '1rem',
    left: 0,
    right: 0,
    bottom: ({ bottom }) => bottom,
    borderBottom: '1px solid #dddddd',
  },
  time: {
    fontSize: '0.7rem',
    paddingLeft: theme.spacing(1),
    color: theme.palette.primary.dark,
    fontWeight: 'bold',
    letterSpacing: '0.1rem',
  },
}));
