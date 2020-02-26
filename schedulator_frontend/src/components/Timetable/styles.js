import { makeStyles } from '@material-ui/core';


export const useTimetableStyle = makeStyles(theme => ({
  mainBox: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    height: 0,
  },
  gridScrollBox: {
    minHeight: 700,
    width: '100%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  gridBox: {
    flex: '1 1 auto',
    background: theme.palette.custom.timetable.background,
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    overflowY: 'auto',

  },
  headerBox: {
    height: 60,
    flexShrink: 0,
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    background: theme.palette.primary.dark,
    color: theme.palette.custom.timetable.headerText,
    borderBottom: '4px solid',
    borderBottomColor: theme.palette.custom.timetable.border,
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
    borderLeft: '1px solid',
    borderColor: theme.palette.custom.timetable.border,
  },
  weekDay: {
    fontFamily: 'Montserrat',
  },
  navigationBox: {
    display: 'flex',
    flexShrink: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    background: theme.palette.custom.timetable.background,
    padding: theme.spacing(0.3),
  },
  navButton: {
    flex: '2 1 0',
  },
  flexExpander: {
    flexGrow: 1,
  },
  scrollOffsetSpacer: {
    width: ({ scrollbarWidth }) => scrollbarWidth,
  },
}));

export const useTimetableColumnStyles = makeStyles(theme => ({
  mainBox: {
    position: 'relative',
    flexGrow: 1,
    padding: theme.spacing(0, 0.3),
    borderLeft: '1px solid',
    borderColor: theme.palette.custom.timetable.border,
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
    background: theme.palette.custom.timetable.entryBackground,
    overflow: 'hidden',
  },
  buttonBase: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '100%',
    height: '100%',
  },
  entryContentHeader: {
    width: '100%',
    background: theme.palette.custom.timetable.entryHeaderBackground,
    color: theme.palette.custom.timetable.entryHeaderFont,
    overflow: 'hidden',
    padding: theme.spacing(0.2, 0.4),
    fontWeight: 'bold',
    fontSize: ({ subjectFontSize }) => subjectFontSize,
    fontFamily: 'Montserrat',
    borderBottom: ({ subjectBorderBottom }) => subjectBorderBottom,
    borderBottomColor: theme.palette.custom.timetable.entryHeaderBorder,
    height: ({ subjectHeight }) => subjectHeight,
  },
  entryContentBox: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 0.3),
    color: theme.palette.custom.timetable.entryContentFont,
    overflow: 'hidden',
    fontSize: ({ subjectComponentFontSize }) => subjectComponentFontSize,
    fontFamily: 'Nunito',
    fontWeight: 'bold',
    borderImage: 'linear-gradient(to bottom, red, rgba(0, 0, 0, 0)) 1 100%',
    flexShrink: 0,
  },
  formation: {
    width: '100%',
    color: theme.palette.custom.timetable.formationFont,
    overflow: 'hidden',
    fontSize: ({ subjectFontSize }) => subjectFontSize,
    fontFamily: 'Montserrat',
  },
  subjectComponentColor: {
    color: ({ subjectComponentColor }) => subjectComponentColor,
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
    marginLeft: 45,
  },
  time: {
    position: 'absolute',
    fontSize: '0.7rem',
    paddingLeft: theme.spacing(1),
    color: theme.palette.primary.dark,
    fontWeight: 'bold',
    letterSpacing: '0.1rem',
    fontFamily: 'Nunito',
    left: -47,
    bottom: -9,
  },
}));
