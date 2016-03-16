Object.assign = require('object-assign');
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
import Coupon from './containers/Coupon';
import Consultation from './containers/Consultation'
import { Router, Route, browserHistory,Redirect } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);
render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App} />
      <Route path="/found" component={Found} />
      <Route path="/broke/:id" name="broke" component={Broke}/>
      <Route path="/coupon" component={Coupon} />
      <Route path="/topic/:id" name="topic" component={Topic}/>
      <Route path="/expert/:id" name="expert" component={Expert}/>
      <Route path="/consultation/:id" name="consultation" component={Consultation}/>
    </Router>
  </Provider>,
  document.getElementById('app')
);
