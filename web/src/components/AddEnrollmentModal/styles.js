import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
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
  dialogContent: {
    minHeight: '100px',
    position: 'relative',
  },
}));
export const useSubjectRowStyles = makeStyles(theme => ({
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
