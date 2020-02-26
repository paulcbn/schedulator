import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  header: {
    margin: theme.spacing(1),
  },
}));

export const useSectionTableStyles = makeStyles(theme => ({
  rootBox: {
    margin: theme.spacing(2),
    borderRadius: theme.spacing(1),
    background: theme.palette.custom.sectionTable.rootBox,
  },
  titleBox: {
    padding: theme.spacing(1),
    borderRadius: theme.spacing(1),
    background: theme.palette.primary.main,
  },
  bodyBox: {
    padding: theme.spacing(1),
  },
  expansionPanel: {
    borderRadius: theme.spacing(0.5),
    background: theme.palette.custom.sectionTable.expansionPanel,
  },
  heading: {
    background: theme.palette.custom.sectionTable.heading,
    color: theme.palette.custom.sectionTable.headingFont,
  },
  expansionBody: {
    padding: theme.spacing(1),
  },

}));

export const useSubjectSearchStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
  searchBoxRow: {
    display: 'flex',
    alignItems: 'center',
  },
  searchBox: {
    margin: theme.spacing(1, 1, 1, 0),
    flexGrow: 1,
  },
  searchButton: {
    margin: theme.spacing(1, 0, 1, 1),
  },
  content: {
    position: 'relative',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
}));

export const useSearchSubjectRowStyles = makeStyles(theme => ({
  rowBox: {
    margin: theme.spacing(1, 0),
    padding: theme.spacing(0.5, 1),
    display: 'flex',
    alignItems: 'center',
    border: '1px solid',
    borderColor: theme.palette.custom.rowBox.graySmallBorder,
    borderRadius: theme.spacing(1),
    flexGrow: 1,
  },
  contentBox: {
    flexGrow: 1,
  },

}));

export const useTeacherSearchStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
  searchBoxRow: {
    display: 'flex',
    alignItems: 'center',
  },
  searchBox: {
    flexGrow: 1,
    margin: theme.spacing(1, 1, 1, 0),
  },
  searchButton: {
    margin: theme.spacing(1, 0, 1, 1),
  },
  content: {
    // minHeight: '100px',
    position: 'relative',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
}));

export const useSearchTeacherRowStyles = makeStyles(theme => ({
  rowBox: {
    margin: theme.spacing(1, 0),
    padding: theme.spacing(0.5, 1),
    display: 'flex',
    alignItems: 'center',
    border: '1px solid',
    borderColor: theme.palette.custom.rowBox.graySmallBorder,
    borderRadius: theme.spacing(1),
    flexGrow: 1,
  },
  contentBox: {
    flexGrow: 1,
  },

}));

export default useStyles;
