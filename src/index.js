require('babel-polyfill');
require('es6-promise').polyfill();
require('isomorphic-fetch');
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './stores';
import App from './containers/App';
import Found from './containers/Found';
import Topic from './containers/Topic';
import Broke from './containers/Broke';
import Expert from './containers/Expert';
import Consultation from './containers/Consultation';
import Register from './containers/Register';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}/>
      <Route path="/found" component={Found}/>
      <Route path="/broke/:id" name="broke" component={Broke}/>
      <Route path="/topic/:id" name="topic" component={Topic}/>
      <Route path="/expert/:id" name="expert" component={Expert}/>
      <Route path="/consultation/:id" name="consultation" component={Consultation}/>
      <Route path="/register" name="register" component={Register}/>
    </Router>
  </Provider>,
  document.getElementById('app')
);
