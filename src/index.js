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

// console.log(configureStore());
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
        <Route path="topic/:id" name="topic" getComponent={(location, cb) => { // 话题详情页
          require.ensure([], (require) => {
            cb(null, require('./containers/Topic'));
          })
        }}/>
        <Route path="expert/:id" name="expert" getComponent={(location, cb) => { // 点师详情
          require.ensure([], (require) => {
            cb(null, require('./containers/Expert'));
          })
        }}/>
        <Route path="consultation/:id" name="consultation" getComponent={(location, cb) => { // 资讯详情
          require.ensure([], (require) => {
            cb(null, require('./containers/Consultation'));
          })
        }}/>
        <Route path="register" name="register" getComponent={(location, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./containers/Register'));
          })
        }}/>
        <Route path="login" name="login" getComponent={(location, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./containers/Login'));
          })
        }}/>
        <Route path="applyExpert" name="applyExpert" getComponent={(location, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./containers/ApplyExpert'));
          })
        }}/>
        <Route path="dynamic/:id" name="dynamic" getComponent={(location, cb) => { // 动态详情
          require.ensure([], (require) => {
            cb(null, require('./containers/Dynamic'));
          })
        }}/>
        <Route path="activity/:id" name="activity" getComponent={(location, cb) => { // 专题详情
          require.ensure([], (require) => {
            cb(null, require('./containers/Activity'));
          })
        }}/>
        <Route path="college/:id" name="college" getComponent={(location, cb) => { //学校详情
          require.ensure([], (require) => {
            cb(null, require('./containers/College'));
          })
        }}/>
        <Route path="answer/:id" name="answer" getComponent={(location, cb) => { // 益达回答详情
          require.ensure([], (require) => {
            cb(null, require('./containers/Answer'));
          })
        }}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
