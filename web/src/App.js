import React from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import {Provider} from 'react-redux'
import {applyMiddleware, createStore} from 'redux'
import {RootContainer} from "./components";

import rootReducer from "./lib/reducers";
import thunk from "redux-thunk";

let store = createStore(rootReducer, applyMiddleware(thunk));


function App() {
  return (
    <>
      <CssBaseline/>
      <Provider store={store}>
        <RootContainer/>
      </Provider>
    </>
  );
}

export default App;
