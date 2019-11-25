import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import moment from 'moment';
import 'moment/locale/ro';
import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import { RootContainer } from './components';
import rootReducer from './lib/reducers';
import theme from './lib/theme';
import './polyfills'
moment.locale('ro');

let store = createStore(rootReducer, applyMiddleware(thunk));

function App() {
  return <>
    <CssBaseline/>
    <ThemeProvider theme={ theme }>
      <Provider store={ store }>
        <RootContainer/>
      </Provider>
    </ThemeProvider>
  </>;
}

export default App;
