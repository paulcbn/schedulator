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
    background: theme.palette.custom.hierarchyView.rootBox,
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
    background: theme.palette.custom.hierarchyView.heading,
    color: theme.palette.custom.hierarchyView.headingFont,
  },
  expansionPanel: {
    borderRadius: theme.spacing(0.5),
    background: theme.palette.custom.hierarchyView.expansionPanel,
  },
  expansionBody: {
    padding: theme.spacing(1),
  },
}));

export default useStyles;
