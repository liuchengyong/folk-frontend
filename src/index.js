require('babel-polyfill');
require('es6-promise').polyfill();
require('isomorphic-fetch');
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './stores';
import App from './containers/App';

import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history}>
    
      <Route path="/" component={App}>
        <Route path="found" getComponent={(location, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./containers/Found'));
          })
        }}/>
        <Route path="broke/:id" name="broke" getComponent={(location, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./containers/Broke'));
          })
        }}/>
        <Route path="topic/:id" name="topic" getComponent={(location, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./containers/Topic'));
          })
        }}/>
        <Route path="expert/:id" name="expert" getComponent={(location, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./containers/Expert'));
          })
        }}/>
        <Route path="consultation/:id" name="consultation" getComponent={(location, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./containers/Consultation'));
          })
        }}/>
        <Route path="register" name="register" getComponent={(location, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./containers/register'));
          })
        }}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
