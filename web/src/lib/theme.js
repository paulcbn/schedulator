import { createMuiTheme } from '@material-ui/core';

export default createMuiTheme({
  palette: {
    primary: {
      light: '#bef67a',
      main: '#8bc34a',
      dark: '#5a9216',
      contrastText: '#000',
    },
    secondary: {
      light: '#ffc947',
      main: '#ff9800',
      dark: '#c66900',
      contrastText: '#000',
    },
    enrollmentState: {
      deleteButton: {
        color: '#e91616',
        hoverColor: 'rgba(217,109,109,0.41)',
      },
      icons: {
        error: '#e91616',
        valid: '#1A1',
        warn: '#FA1'
      },
    },
  },
  typography: {},
});
