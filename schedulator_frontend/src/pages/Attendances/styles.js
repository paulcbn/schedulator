import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({}));

export const useAttendancesStyles = makeStyles(theme => ({
  subjectsBox: {
    padding: theme.spacing(3, 1),
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%',
  },
  subjectComponentBox: {
    position: 'relative',
    flexGrow: 1,
  },
}));

export const useComponentRowStyles = makeStyles(theme => ({
  rowBox: {
    margin: theme.spacing(1, 0),
    display: 'flex',
    alignItems: 'center',
  },
  errorIcon: {
    color: theme.palette.custom.enrollmentState.icons.error,
  },
  validIcon: {
    color: theme.palette.custom.enrollmentState.icons.valid,
  },
  warningIcon: {
    color: theme.palette.custom.enrollmentState.icons.warn,
  },
  title: {
    display: 'flex',
    alignItems: 'center',
  },
  flexExpander: {
    flexGrow: 1,
  },
}));

export const useAddEntryModalRowStyles = makeStyles(theme => ({
  rowBox: {
    padding: theme.spacing(0.5, 1),
    display: 'flex',
    alignItems: 'stretch',
    border: '1px solid',
    borderColor: theme.palette.custom.rowBox.graySmallBorder,
    borderRadius: theme.spacing(1),
    flexGrow: 1,
  },
  deleteButton: {
    flexShrink: 0,
    color: theme.palette.custom.enrollmentState.deleteButton.color,
    '&:hover': {
      backgroundColor: theme.palette.custom.enrollmentState.deleteButton.hoverColor,
    },
  },
  timeBox: {
    display: 'flex',
    alignItems: 'center',
  },
  buttonBox: {
    display: 'flex',
    alignItems: 'center',
  },
  formationTypography: {
    margin: theme.spacing(0, 1),
  },
  weekDayTypography: {
    margin: theme.spacing(0, 1),
  },
  timeTypography: {
    margin: theme.spacing(0, 1),
  },
  teacherTypography: {
    margin: theme.spacing(0, 1),
  },
  roomTypography: {
    margin: theme.spacing(0, 1),
  },
  gridContainer: {
    alignItems: 'center',
  },
  gridItem: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'nowrap',
  },

}));




export const useSubjectCardStyles = makeStyles(theme => ({
  card: {
    margin: theme.spacing(2, 0),
  },
  cardContent: {
    paddingBottom: 0,
  },
  flexExpander: {
    flexGrow: 1,
  },
  deleteButton: {
    color: theme.palette.custom.enrollmentState.deleteButton.color,
    '&:hover': {
      backgroundColor: theme.palette.custom.enrollmentState.deleteButton.hoverColor,
    },
  },
}));


export const useSubjectComponentModalStyles = makeStyles(theme => ({
  fabBox: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  emptyTypography: {
    marginLeft: theme.spacing(1),
  },
  titleTypography: {
    margin: theme.spacing(1),
  },
  root: {
    minHeight: theme.spacing(30),
  },
}));

export const useAddEntryModalStyles = makeStyles(theme => ({
  dialogTitle: {
    margin: theme.spacing(1),
  },
  dialogContent: {
    margin: theme.spacing(1),
  },
  listItem: {
    padding: 0,
    margin: theme.spacing(1),
  },
  confirmBox: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingRight: theme.spacing(1),
  },
  emptyTypography: {
    marginLeft: theme.spacing(1),
  },
  titleTypography: {
    margin: theme.spacing(1),
  },
}));

export const useEntryRowStyles = makeStyles(theme => ({
   rowBox: {
    margin: theme.spacing(1, 0),
    padding: theme.spacing(0.5, 1),
    display: 'flex',
    alignItems: 'stretch',
    border: '1px solid',
    borderColor: theme.palette.custom.rowBox.graySmallBorder,
    borderRadius: theme.spacing(1),
    flexGrow: 1,
  },
  deleteButton: {
    flexShrink: 0,
    color: theme.palette.custom.enrollmentState.deleteButton.color,
    '&:hover': {
      backgroundColor: theme.palette.custom.enrollmentState.deleteButton.hoverColor,
    },
  },
  timeBox: {
    display: 'flex',
    alignItems: 'center',
  },
  buttonBox: {
    display: 'flex',
    alignItems: 'center',
  },
  formationTypography: {
    margin: theme.spacing(0, 1),
  },
  weekDayTypography: {
    margin: theme.spacing(0, 1),
  },
  timeTypography: {
    margin: theme.spacing(0, 1),
  },
  teacherTypography: {
    margin: theme.spacing(0, 1),
  },
  roomTypography: {
    margin: theme.spacing(0, 1),
  },
  gridContainer: {
    alignItems: 'center',
  },
  gridItem: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'nowrap',
  },
}));

export default useStyles;
