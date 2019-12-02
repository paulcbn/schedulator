import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({}));

export const useOtherSectionStyles = makeStyles(theme => ({
  paddingTopBox: {
    paddingTop: theme.spacing(3),
  },
}));

export const useHierarchyViewStyles = makeStyles(theme => ({
  marginRight: {
    marginRight: theme.spacing(1),
  },
  rootBox: {
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
  heading: {
    background: 'rgb(240,240,240)',
    color: 'rgb(69,69,69)',
  },
  expansionPanel: {
    borderRadius: theme.spacing(0.5),
    background: 'rgb(249,249,249)',
  },
  expansionBody: {
    padding: theme.spacing(1),
  },
}));

export default useStyles;
