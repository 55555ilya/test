import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, hashHistory } from 'react-router';

import routes from './routes/routing';
import rootReducer from './reducers'
import { getCookie } from './utils/cookies.js'
import * as Navigator from './utils/navigator.js'
import { fetchData } from './actions/data.js'

let preloadedState = null;

var token = getCookie('token');

if(window.__PRELOADED_STATE__) {
  preloadedState = window.__PRELOADED_STATE__;
  delete window.__PRELOADED_STATE__;
} else {
  preloadedState = {categories: [], credentials: { token: token }};
}

const store = createStore(
  rootReducer,
  preloadedState,
  applyMiddleware(
    thunkMiddleware
  )
);

if(token) {
  store.dispatch(fetchData()).then(
    () => {},
    () => Navigator.toLogin()
  );
} else {
  Navigator.toLogin();
}

ReactDOM.render(
  <Provider store={store}>
      <Router routes={routes} history={hashHistory} />
  </Provider>
  ,
  document.getElementById('root')
);

