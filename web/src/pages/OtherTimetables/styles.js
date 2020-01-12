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
    background: 'rgb(249,249,249)',
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
    background: 'rgb(249,249,249)',

  },
  heading: {
    background: 'rgb(240,240,240)',
    color: 'rgb(69,69,69)',
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

export const useSearchSubjectRowStyles = makeStyles(theme => ({
  rowBox: {
    margin: theme.spacing(1, 0),
    padding: theme.spacing(0.5, 1),
    display: 'flex',
    alignItems: 'center',
    border: '1px solid',
    borderColor: 'rgba(0, 0, 0, 0.12)',
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
    borderColor: 'rgba(0, 0, 0, 0.12)',
    borderRadius: theme.spacing(1),
    flexGrow: 1,
  },
  contentBox: {
    flexGrow: 1,
  },

}));

export default useStyles;
