import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({}));

export const useSectionTableStyles = makeStyles(theme => ({
  rootBox: {
    marginTop: theme.spacing(3),
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

export default useStyles;
