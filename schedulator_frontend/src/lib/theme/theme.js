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
    custom: {
      rowBox: {
        graySmallBorder: 'rgba(0, 0, 0, 0.12)',
      },
      enrollmentState: {
        deleteButton: {
          color: '#e91616',
          hoverColor: 'rgba(217,109,109,0.41)',
        },
        icons: {
          error: '#e91616',
          valid: '#1A1',
          warn: '#FA1',
        },
      },
      layout: {
        sLetter: '#5a9216',
        title: '#F3F3F3',
      },
      overlayCircularProgress: {
        background: 'rgba(240, 240, 240, 0.6)',
      },
      timetable: {
        background: '#f9f9f9',
        border: '#cccccc',
        headerText: '#f0f0f0',
        entryBackground: 'rgba(180,236,127,0.65)',
        entryHeaderBackground: 'rgba(139,195,74,0.77)',
        entryHeaderFont: '#4b4b4b',
        entryHeaderBorder: '#4b4b4b',
        entryContentFont: '#4b4b4b',
        formationFont: '#f0f0f0',
      },
      hierarchyView: {
        rootBox: 'rgb(249,249,249)',
        heading: 'rgb(240,240,240)',
        headingFont: 'rgb(69,69,69)',
        expansionPanel: 'rgb(249,249,249)',
      },
      sectionTable: {
        rootBox: 'rgb(249,249,249)',
        heading: 'rgb(240,240,240)',
        headingFont: 'rgb(69,69,69)',
        expansionPanel: 'rgb(249,249,249)',
      },
    },
  },
  typography: {},
});
