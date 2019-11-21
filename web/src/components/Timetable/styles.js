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
  weekDay: {
    fontFamily: 'Montserrat',
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
    background: 'rgba(180,236,127,0.65)',
    overflow: 'hidden',
  },
  buttonBase: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '100%',
    height: '100%',
  },
  subject: {
    width: '100%',
    background: 'rgba(139,195,74,0.77)',
    color: '#4b4b4b',
    overflow: 'hidden',
    padding: theme.spacing(0.2, 0.4),
    fontSize: ({ overlapSize }) => {
      if (overlapSize < 1) overlapSize = 1;
      if (overlapSize > 4) overlapSize = 4;
      return `${ 1 - overlapSize * 0.1 }rem`;
    },
    fontFamily: 'Montserrat',
    borderBottom: '1px solid',
    borderBottomColor: '#4b4b4b',
    height: '3.3rem',
  },
  subjectComponent: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 0.3),
    color: '#4b4b4b',
    overflow: 'hidden',
    fontSize: '0.8rem',
    fontFamily: 'Nunito',
    fontWeight: 'bold',
    borderImage: 'linear-gradient(to bottom, red, rgba(0, 0, 0, 0)) 1 100%',
    flexShrink: 0,
  },
  formation: {
    width: '100%',
    // background: 'rgba(139,195,74,0.77)',
    color: '#4b4b4b',
    overflow: 'hidden',
    fontSize: '0.8rem',
    fontFamily: 'Montserrat',
  },
  subjectComponentColor: {
    color: ({ color }) => {
      switch (color) {
        case 'Curs':
          return '#00400b';
        case 'Seminar':
          return '#cd7200';
        default:
          return 'rgba(255,5,0,0.8)';
      }
    },
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
    fontFamily: 'Nunito',
  },
}));
