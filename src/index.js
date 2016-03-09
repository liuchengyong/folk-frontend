import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './stores';
import App from './containers/App';
import Found from './containers/Found';
import Topic from './containers/Topic';
import Broke from './containers/Broke';
import Coupon from './containers/Coupon';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);
render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}></Route>
      <Route path="found" component={Found}></Route>
      <Route path="coupon" component={Coupon}></Route>
      <Route path="topic/:id" name="topic" component={Topic}/>
      <Route path="broke/:id" name="broke" component={Broke}/>
    </Router>
  </Provider>,
  document.getElementById('app')
);
